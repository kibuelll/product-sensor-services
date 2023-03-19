const express = require("express");
const app = express();
const cors = require('cors')
const PORT = 3000 || process.env.PORT;

const { Server } = require("socket.io");
const { createServer } = require("http");
const httpServer = createServer(app);
const mqtt = require("mqtt");
const routes = require("./router") 

const client = mqtt.connect("mqtt://localhost");

const {Sensor} = require("./models");
const handleErr = require("./middlewares/error");

const io = new Server(httpServer, {
  cors: {
    origin: "*",
  },
});

app.use(cors())
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes)
app.use(handleErr)


// Helper function to generate random integer
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

setInterval( async () => {
  try {
    const supplyData = {
      temperature: getRandomInt(20, 30),
      pressure: getRandomInt(800, 1200),
      humidity: getRandomInt(30, 70),
      date: new Date()
    };
  
    await Sensor.create({
      temperature: supplyData.temperature,
      pressure: supplyData.pressure,
      humidity: supplyData.humidity,
      date : supplyData.date
    })

    client.publish("supply-data", JSON.stringify(supplyData));
    console.log(`Supply data published: ${JSON.stringify(supplyData)}`);
  } catch (error) {
    throw error;
  }
}, 120000); // 2 minutes in milliseconds

io.on("connection", async (socket) => {
  console.log("connected", socket.id);
  const supplyData = {
    temperature: getRandomInt(20, 30),
    pressure: getRandomInt(800, 1200),
    humidity: getRandomInt(30, 70),
    date: new Date()
  };

  await Sensor.create({
    temperature: supplyData.temperature,
    pressure: supplyData.pressure,
    humidity: supplyData.humidity,
    date : supplyData.date
  })

  client.publish("supply-data", JSON.stringify(supplyData));
  console.log(`Supply data published: ${JSON.stringify(supplyData)}`);

  client.subscribe("supply-data");

  client.on("message", async (topic, message) => {
    if (topic === "supply-data") {
      const supplyData = JSON.parse(message);
      socket.emit("supply-data", supplyData);
    }
  });

});

httpServer.listen(PORT, () => {
  console.log(`app launching on port ${PORT}`);
});
