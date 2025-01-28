const sequelize = require('../db');
const { book, author } = sequelize.models;
const { validationResult } = require('express-validator');
const ApiError = require('../exceptions/api.errors');

const userService = require('../services/user.service');

const jwt = require('jsonwebtoken');

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
      const validationErrors = validationResult(req);

      if (!validationErrors.isEmpty())
        return next(
          ApiError.BadRequest('Validacijos klaida', validationErrors.array())
        );

      await userService.isUserAdmin(req.cookies);

      const { title, summary, isbn, author_id } = req.body;

      const existingAuthor = await author.findOne({ where: { id: author_id } });

      if (!existingAuthor) throw ApiError.BadRequest('Toks autorius nerastas');

      const newBook = await book.create({ title, summary, isbn, author_id });

      res.status(200).json(newBook);
    } catch (e) {
      next(e);
    }
  }

  // - `PATCH /books/:id`: Atnaujinti knygos informaciją (tik admin). ** 0.5 taškas **
  async updateBook(req, res, next) {
    try {
      const validationErrors = validationResult(req);

      if (!validationErrors.isEmpty())
        return next(
          ApiError.BadRequest('Validacijos klaida', validationErrors.array())
        );

      await userService.isUserAdmin(req.cookies);

      const updatedBook = await book.findOne({ where: { id: req.params.id } });

      if (!updatedBook) throw new Error('tokios knygos nera');

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
      await userService.isUserAdmin(req.cookies);

      const deletedBook = await book.findOne({ where: { id: req.params.id } });

      if (!deletedBook) throw new Error('Tokios knygos nepavyko rasti');

      await deletedBook.destroy();

      res.status(200).json({ success: 'success' });
    } catch (e) {
      next(e);
    }
  }
}

module.exports = new BooksController();
