const ApiError = require("../exceptions/api.errors");
const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  try {
  } catch (e) {
    return next(ApiError.UnauthorizedError());
  }
};
