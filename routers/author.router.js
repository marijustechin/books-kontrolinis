const Router = require("express").Router;
const authorController = require("../controllers/author.controller");

const authorRouter = new Router();

// - `GET /authors`: Gauti visų autorių sąrašą. ** 0.5 taškas **
authorRouter.get("/", authorController.getAllAuthors);

// - `GET /authors/:id`: Gauti autoriaus informaciją pagal ID. ** 0.5 taškas **
authorRouter.get("/:id", authorController.getAllAuthorById);

// - `POST /authors`: Sukurti naują autorių (tik admin). ** 0.5 taškas **
authorRouter.post("/", authorController.newAuthor);

// - `PATCH /authors/:id`: Atnaujinti autoriaus informaciją (tik admin). ** 0.5 taškas **
authorRouter.patch("/:id", authorController.updateAuthor);

// - `DELETE /authors/:id`: Ištrinti autorių (tik admin). ** 0.5 taškas **
authorRouter.delete("/:id", authorController.deleteAuthor);

module.exports = authorRouter;
