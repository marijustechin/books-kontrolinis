function modelRelations(sequelize) {
  const { book, author } = sequelize.models;

  author.hasMany(book, { foreignKey: "author_id", onDelete: "CASCADE" });
  book.belongsTo(author, { foreignKey: "author_id" });
}

module.exports = { modelRelations };
