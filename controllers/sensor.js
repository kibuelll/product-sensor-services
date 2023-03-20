const {Sensor} = require("../models")

class SensorController {
  static async getAll(req,res,next) {
    try {
      const sensors = await Sensor.findAll()
      res.status(200).json(sensors)
    } catch (error) {
      next(error)
    }
  }

  static async getOne(req,res,next) {
    try {
      const {id} = req.params
      const sensor = await Sensor.findByPk(id)
      res.status(200).json(sensor)
    } catch (error) {
      next(error)
    }
  }


  static async update(req,res,next) {
    try {
      const {id} = req.params
      const sensor = await Sensor.findByPk(id)
      if(!sensor)  {
        throw {
          name : "Not Found"
        }
      }
      res.status(200).json(sensor)
    } catch (error) {
      next(error)
    }
  }


  static async destroySensor(req,res,next) {
    try {
      const {id} = req.params
      const sensor = await Sensor.findByPk(id)
      if(!sensor)  {
        throw {
          name : "Not Found"
        }
      }

      await sensor.destroy({
        where : {
          id
        }
      })
      res.status(200).json({message : "Sensor destroyed"})
    } catch (error) {
      next(error)
    }
  }

}

module.exports = SensorController