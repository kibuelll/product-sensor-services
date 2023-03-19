const router = require('express').Router();
const sensorsRoutes = require("./sensor")

router.use("/",sensorsRoutes)

module.exports = router;