'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Sensor extends Model {
    static associate(models) {
      
    }
  }
  Sensor.init({
    temperature: DataTypes.INTEGER,
    pressure: DataTypes.INTEGER,
    humidity: DataTypes.INTEGER,
    date: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Sensor',
  });
  return Sensor;
};