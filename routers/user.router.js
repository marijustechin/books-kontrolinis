const Router = require('express').Router;
const userController = require('../controllers/user.controller');
const validator = require('../validators/user.validator');

const userRouter = new Router();

// - Registracija (`POST /auth/register`): naujo vartotojo sukūrimas. ** 1 taškas **
userRouter.post('/register', validator.register, userController.register);

// - Prisijungimas (`POST /auth/login`): JWT generavimas tik prisijungus. ** 2 taškai **
userRouter.post('/login', validator.login, userController.login);

// - Tik vartotojai su vaidmeniu `admin` gali kurti,
// atnaujinti ir trinti autorius ar knygas. ** 2 taškai **

userRouter.post('/logout', userController.logout);

module.exports = userRouter;
