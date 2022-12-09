const sequelize = require("../db");
const { DataTypes } = require("sequelize");

const Confirmation = sequelize.define("confirmation", {
  id: {
    type: DataTypes.STRING,
    primaryKey: true,
    autoIncrement: false,
    unique: true,
  },
  masterName: { type: DataTypes.STRING, allowNull: false },
  masterSurname: { type: DataTypes.STRING, allowNull: false },
  clientEmail: { type: DataTypes.STRING, allowNull: false },
  townName: { type: DataTypes.STRING, allowNull: false },
  masterRating: {
    type: DataTypes.INTEGER,
    validate: { min: 1, max: 5 },
    allowNull: false,
  },
  day: { type: DataTypes.STRING, allowNull: false },
  hours: { type: DataTypes.STRING, allowNull: false },
});

module.exports = { Confirmation };
