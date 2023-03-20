const router = require("express").Router();
const SensorController = require("../controllers/sensor");
const authentication = require("../middlewares/authentication");

router.get("/", SensorController.getAll);
router.get("/:id", SensorController.getOne);
router.use(authentication);
router.put("/:id", SensorController.update);
router.delete("/:id", SensorController.destroySensor)

module.exports = router;
