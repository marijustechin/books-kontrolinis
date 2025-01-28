const { param } = require('express-validator');

exports.checkParam = [
  param('id').trim().isNumeric().withMessage('Neteisingas id'),
];
