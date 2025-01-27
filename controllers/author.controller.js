const sequelize = require("../db");
const { author } = sequelize.models;
const userService = require("../services/user.service");

class AuthorController {
  // - `GET /authors`: Gauti visų autorių sąrašą. ** 0.5 taškas **
  async getAllAuthors(req, res, next) {
    try {
      const allAuthors = await author.findAll();

      res.status(200).json(allAuthors);
    } catch (e) {
      next(e);
    }
  }
  // - `GET /authors/:id`: Gauti autoriaus informaciją pagal ID. ** 0.5 taškas **
  async getAllAuthorById(req, res, next) {
    try {
      const authorById = await author.findOne({ where: { id: req.params.id } });

      if (!authorById)
        throw new Error(`Autoriaus tokiu id=${req.params.id} nėra`);

      res.status(200).json(authorById);
    } catch (e) {
      next(e);
    }
  }

  // - `POST /authors`: Sukurti naują autorių (tik admin). ** 0.5 taškas **
  async newAuthor(req, res, next) {
    try {
      await userService.isUserAdmin(req.cookies);

      const { name, birthDate, biography } = req.body;

      const existingAuthor = await author.findOne({ where: { name } });

      if (existingAuthor) throw new Error();

      const newAuthor = await author.create({ name, birthDate, biography });

      res.status(200).json(newAuthor);
    } catch (e) {
      next(e);
    }
  }

  // - `PATCH /authors/:id`: Atnaujinti autoriaus informaciją (tik admin). ** 0.5 taškas **
  async updateAuthor(req, res, next) {
    try {
      await userService.isUserAdmin(req.cookies);

      const updateAuthor = await author.findOne({
        where: { id: req.params.id },
      });

      if (!updateAuthor) throw new Error("Author not found");

      const { name, birthDate, biography } = req.body;

      if (name) updateAuthor.name = name;
      if (birthDate) updateAuthor.birthDate = birthDate;
      if (biography) updateAuthor.biography = biography;

      await updateAuthor.save();

      res.status(200).json(updateAuthor);
    } catch (e) {
      next(e);
    }
  }

  // - `DELETE /authors/:id`: Ištrinti autorių (tik admin). ** 0.5 taškas **
  async deleteAuthor(req, res, next) {
    try {
      await userService.isUserAdmin(req.cookies);

      const deleteAuthor = await author.findOne({
        where: { id: req.params.id },
      });

      if (!deleteAuthor) throw new Error("Autorius nerastas");

      await deleteAuthor.destroy();

      res.status(200).json({ success: "success" });
    } catch (e) {
      next(e);
    }
  }
}

module.exports = new AuthorController();
