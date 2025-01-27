const argon2 = require("argon2");

const sequelize = require("../db");
const { user } = sequelize.models;

class UserController {
  // - Registracija (`POST /auth/register`): naujo vartotojo sukūrimas. ** 1 taškas **
  async register(req, res, next) {
    try {
      const { username, password } = req.body;

      const existingUser = await user.findOne({ where: { username } });

      const hashedPassword = await argon2.hash(password);
      console.log(hashedPassword);

      const newUser = await user.create({
        username,
        password: hashedPassword,
      });

      res.status(200).json(newUser);
    } catch (e) {
      next(e);
    }
  }

  // - Prisijungimas (`POST /auth/login`): JWT generavimas tik prisijungus. ** 2 taškai **
  async login(req, res, next) {
    try {
      res.status(200).json("login");
    } catch (e) {
      next(e);
    }
  }
  // - Tik vartotojai su vaidmeniu `admin` gali kurti, atnaujinti
  // ir trinti autorius ar knygas. ** 2 taškai **
}

module.exports = new UserController();
