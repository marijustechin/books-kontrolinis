const argon2 = require('argon2');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const ApiError = require('../exceptions/api.errors');

const sequelize = require('../db');
const { user } = sequelize.models;

class UserController {
  // - Registracija (`POST /auth/register`): naujo vartotojo sukūrimas. ** 1 taškas **
  async register(req, res, next) {
    try {
      const validationErrors = validationResult(req);

      if (!validationErrors.isEmpty())
        return next(
          ApiError.BadRequest('Validacijos klaida', validationErrors.array())
        );

      const { username, password } = req.body;

      const existingUser = await user.findOne({ where: { username } });

      if (existingUser) throw new Error('Toks naudotojas jau yra...');

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
      const validationErrors = validationResult(req);

      if (!validationErrors.isEmpty())
        return next(
          ApiError.BadRequest('Validacijos klaida', validationErrors.array())
        );

      const existingUser = await user.findOne({
        where: { username: req.body.username },
      });

      if (!existingUser)
        throw new Error(`Naudotojo ${req.body.username} nepavyko rasti`);

      const verifiedPassword = await argon2.verify(
        existingUser.password,
        req.body.password
      );

      if (!verifiedPassword) throw new Error('Neteisingas slaptazodis');

      const accessToken = jwt.sign(
        { username: existingUser.username, role: existingUser.role },
        process.env.JWT_ACCESS_SECRET,
        {
          expiresIn: process.env.JWT_ACCESS_EXPIRES,
        }
      );

      res.cookie('accessToken', accessToken, {
        maxAge: 24 * 60 * 60 * 1000, // 1 d.
        httpOnly: true,
      });

      res.status(200).json(req.body);
    } catch (e) {
      next(e);
    }
  }
  // - Tik vartotojai su vaidmeniu `admin` gali kurti, atnaujinti
  // ir trinti autorius ar knygas. ** 2 taškai **

  async logout(req, res, next) {
    try {
      const { accessToken } = req.cookies;

      res.clearCookie('accessToken');

      res.status(200).json('logged out...');
    } catch (e) {
      next(e);
    }
  }
}

module.exports = new UserController();
