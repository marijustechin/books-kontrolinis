const jwt = require("jsonwebtoken");
const ApiError = require("../exceptions/api.errors");

class UserService {
  async isUserAdmin(cookies) {
    const { accessToken } = cookies;

    if (!accessToken) throw ApiError.NotLoggedError();

    const payload = jwt.decode(accessToken);

    if (payload.role !== "admin") throw ApiError.UnauthorizedError();
  }
}

module.exports = new UserService();
