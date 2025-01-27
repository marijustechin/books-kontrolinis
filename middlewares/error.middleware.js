const ApiError = require("../exceptions/api.errors");

module.exports = function (err, req, res, next) {
  // Jei klaida yra iš klaidų klasės
  // grąžinam frontui (klientui)
  if (err instanceof ApiError) {
    return res
      .status(err.status)
      .json({ message: err.message, errors: err.errors });
  }

  //Jei ne, tai nenumatyta klaida - kodas 500
  return res.status(500).json({ message: "Įvyko nenumatyta klaida" });
};
