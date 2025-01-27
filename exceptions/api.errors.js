module.exports = class ApiError extends Error {
  status;
  errors;

  constructor(status, message, errors = []) {
    super(message);
    this.status = status;
    this.errors = errors;
  }

  static UnauthorizedError() {
    return new ApiError(401, "Reikalinga administratoriaus prieiga");
  }

  static NotLoggedError() {
    return new ApiError(401, "Prašome prisijungti");
  }

  static BadRequest(message, errors = []) {
    return new ApiError(400, message, errors);
  }
};
