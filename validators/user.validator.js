const { body } = require('express-validator');

exports.register = [
  body('username')
    .trim()
    .isAlphanumeric()
    .withMessage('Username should consist only of alphanumeric characters')
    .isLength({ min: 3, max: 10 })
    .withMessage('Username length should be between 3 and 10 characters'),
  body('password')
    .trim()
    .isLength({ min: 6 })
    .withMessage('Slaptazodi turi sudaryti bent 6 simboliai'),
];

exports.login = [
  body('username')
    .trim()
    .isAlphanumeric()
    .withMessage('Username should consist only of alphanumeric characters'),
];
