const { DataTypes } = require("sequelize");
const sequelize = require("../db");

module.exports = (sequelize) => {
  sequelize.define("author", {
    // - `name` (string, privaloma, bent 2 simboliai).
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    // - `birthDate` (data, privaloma, formatu YYYY-MM-DD).
    birthDate: {
      type: DataTypes.DATE,
    },
    // - `biography` (string, neprivaloma, ne daugiau kaip 150 simbolių).
    biography: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  });
};
