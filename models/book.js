'use strict';
const {
  Model
} = require('sequelize');
const { format, formatDistance, formatRelative, subDays } = require ('date-fns')
const randomIsbnGenerator = require('../helpers/randomIsbnGenerator');
module.exports = (sequelize, DataTypes) => {
  class Book extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Book.belongsTo(models.Category)
      Book.belongsTo(models.User)
    }

    generateIsbn() {
      let result = ""
      let randomCode = randomIsbnGenerator()
      let title = this.title.slice(0, 5).replaceAll(' ', '_')
      result = `${title}-${randomCode}`
      return result
    }

    get formatedDate () {
      return formatDistance(this.createdAt, new Date(), [])
    }
  }
  Book.init({
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Title is Required!!'
        },
        notEmpty: {
          msg: 'Title is Required!!'
        },
      }
    },
    isbn: DataTypes.STRING,
    imgCover: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Image Cover is Required!!'
        },
        notEmpty: {
          msg: 'Image Cover is Required!!'
        },
        isUrl: {
          msg: 'URL Image is Incorrect'
        }
      }
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Description is Required!!'
        },
        notEmpty: {
          msg: 'Description is Required!!'
        },
      }
    }
  }, {
    sequelize,
    modelName: 'Book',
  });

  Book.beforeCreate(value => {
    value.isbn = value.generateIsbn()
  })
  return Book;
};