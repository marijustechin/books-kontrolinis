const { DataTypes } = require("sequelize");
const sequelize = require("../db");

module.exports = (sequelize) => {
  sequelize.define("user", {
    // - `username` (unikalus string, privaloma).
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    // - `password` (hashed string, privaloma).
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    // - `role` ("user", "admin").
    role: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "user",
    },
  });
};
