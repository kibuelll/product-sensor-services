const router =  require('express').Router();
const SensorController = require("../controllers/sensor");
const authentication = require('../middlewares/authentication');

router.use(authentication)
router.get('/', SensorController.getAll);
router.get("/:id", SensorController.getOne)
router.put("/:id", SensorController.update)

module.exports = router;