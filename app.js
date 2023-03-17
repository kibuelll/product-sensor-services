const express = require("express");
const app = express();
const PORT = 3000 || process.env.PORT;

const { Server } = require("socket.io");
const { createServer } = require("http");
const httpServer = createServer(app);
const mqtt = require("mqtt");
// const options = {
//   host: "263472cce46a484ebe28884e860989dd.s2.eu.hivemq.cloud",
//   port: 8883,
//   protocol: "mqtts",
//   username: "kibuell",
//   password: "230699Ipul",
// };

const client = mqtt.connect("mqtt://localhost");
const supplyDataHistory = [];

const io = new Server(httpServer, {
  cors: {
    origin: "*",
  },
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Helper function to generate random integer
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

setInterval(() => {
  const supplyData = {
    temperature: getRandomInt(20, 30),
    pressure: getRandomInt(800, 1200),
    humidity: getRandomInt(30, 70),
  };

  supplyDataHistory.push(supplyData);
  client.publish("supply-data", JSON.stringify(supplyData));
  console.log(`Supply data published: ${JSON.stringify(supplyData)}`);
  console.log(supplyDataHistory)
}, 120000); // 2 minutes in milliseconds

io.on("connection", (socket) => {
  console.log("connected", socket.id);
  const supplyData = {
    temperature: getRandomInt(20, 30),
    pressure: getRandomInt(800, 1200),
    humidity: getRandomInt(30, 70),
  };

  client.publish("supply-data", JSON.stringify(supplyData));
  supplyDataHistory.push(supplyData);
  console.log(`Supply data published: ${JSON.stringify(supplyData)}`);

  client.subscribe("supply-data");

  client.on("message", (topic, message) => {
    if (topic === "supply-data") {
      const supplyData = JSON.parse(message);
      supplyDataHistory.push(supplyData);
      socket.emit("supply-data", supplyData);
    }
  });

});

httpServer.listen(PORT, () => {
  console.log(`app launching on port ${PORT}`);
});
