const sequelize = require("../db");
const { DataTypes } = require("sequelize");

const Admin = sequelize.define("admin", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    unique: true,
  },
  email: { type: DataTypes.STRING, unique: true, allowNull: false },
  password: { type: DataTypes.STRING, allowNull: false },
});

module.exports = { Admin };
