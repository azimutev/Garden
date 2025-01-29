const { DataTypes, Sequelize } = require("sequelize");
const sequelize = require("../db");

const Sensor = sequelize.define("sensor", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  temperature: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  lux: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  humidity: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  pump: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  moisture: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  flowrate: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  ip_address: {
    type: DataTypes.STRING(15),
    allowNull: false,
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
  },
});

module.exports = Sensor;
