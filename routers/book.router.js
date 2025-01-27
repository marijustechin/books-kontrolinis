const Router = require("express").Router;
const bookController = require("../controllers/book.controller");

const bookRouter = new Router();

// - `GET /books`: Gauti visų knygų sąrašą. ** 0.5 taškas **
bookRouter.get("/", bookController.getAllBooks);

// - `GET /books/:id`: Gauti knygos informaciją pagal ID. ** 0.5 taškas **
bookRouter.get("/:id", bookController.getBookById);

// - `POST /books`: Sukurti naują knygą (tik admin). ** 0.5 taškas **
bookRouter.post("/", bookController.newBook);

// - `PATCH /books/:id`: Atnaujinti knygos informaciją (tik admin). ** 0.5 taškas **
bookRouter.patch("/:id", bookController.updateBook);

// - `DELETE /books/:id`: Ištrinti knygą (tik admin). ** 0.5 taškas **
bookRouter.delete("/:id", bookController.deleteBook);

module.exports = bookRouter;
