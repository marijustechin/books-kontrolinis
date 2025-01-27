const sequelize = require("../db");
const { book } = sequelize.models;

class BooksController {
  // - `GET /books`: Gauti visų knygų sąrašą. ** 0.5 taškas **
  async getAllBooks(req, res, next) {
    try {
      const allBooks = await book.findAll();

      res.status(200).json(allBooks);
    } catch (e) {
      next(e);
    }
  }

  // - `GET /books/:id`: Gauti knygos informaciją pagal ID. ** 0.5 taškas **
  async getBookById(req, res, next) {
    try {
    } catch (e) {
      next(e);
    }
  }

  // - `POST /books`: Sukurti naują knygą (tik admin). ** 0.5 taškas **
  async newBook(req, res, next) {
    try {
      const { title, summary, isbn, author_id } = req.body;

      const newBook = await book.create({ title, summary, isbn, author_id });

      res.status(200).json(newBook);
    } catch (e) {
      next(e);
    }
  }

  // - `PATCH /books/:id`: Atnaujinti knygos informaciją (tik admin). ** 0.5 taškas **
  async updateBook(req, res, next) {
    try {
      const updatedBook = await book.findOne({ where: { id: req.params.id } });

      if (!updatedBook) throw new Error("tokios knygos nera");

      const { title, summary, isbn, author_id } = req.body;

      if (title) updatedBook.title = title;
      if (summary) updatedBook.summary = summary;
      if (isbn) updatedBook.isbn = isbn;
      if (author_id) updatedBook.author_id = author_id;

      await updatedBook.save();

      res.status(200).json(updatedBook);
    } catch (e) {
      next(e);
    }
  }

  // - `DELETE /books/:id`: Ištrinti knygą (tik admin). ** 0.5 taškas **
  async deleteBook(req, res, next) {
    try {
    } catch (e) {
      next(e);
    }
  }
}

module.exports = new BooksController();