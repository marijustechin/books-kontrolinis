const { DataTypes } = require("sequelize");
const sequelize = require("../db");

module.exports = (sequelize) => {
  sequelize.define("book", {
    // - `title` (string, privaloma, bent 3 simboliai).
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    //     - `summary` (string, neprivaloma).
    summary: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    // - `isbn` (unikalus string, privaloma, 10 skaitmenų, negali turėti tarpų
    // ar specialiųjų simbolių, gali turėti vidurinius brūkšniukus "-", negali turėti raidžių, tik skaitmenis).
    isbn: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    // - `authorId` (nuoroda į autoriaus id, privaloma).
  });
};
