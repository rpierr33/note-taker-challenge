const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/config');

class Book extends Model {}

Book.init(
  {
    book_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    title: {
      type: DataTypes.STRING
    },
    author: {
      type: DataTypes.STRING
    },
    pages: {
      type: DataTypes.INTEGER
    },
  
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'book'
  }
);

module.exports = Book;
