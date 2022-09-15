'use strict';
const {
  Model, Op
} = require('sequelize');

const bcrypt = require('bcryptjs');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Book)
      User.hasOne(models.Profile)
    }

    static getUserBorrowingBooks (option) {
      const options = {
        ...option,
        order: [['username']]
      }

      return User.findAll(options)
    }

  }
  User.init({
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notNull: {
          msg: 'Username is Required!!'
        },
        notEmpty: {
          msg: 'Username is Required!!'
        },
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notNull: {
          msg: 'Email is Required!!'
        },
        notEmpty: {
          msg: 'Email is Required!!'
        },
        isEmail: {
          msg: 'Format Email is Incorrect!!'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Password is Required!!'
        },
        notEmpty: {
          msg: 'Password is Required!!'
        },
      }
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Role is required'
        },
        notEmpty: {
          msg: 'Role is required'
        },
      }
    }
  }, {
    sequelize,
    modelName: 'User',
  });

  User.beforeCreate(value => {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(`${value.password}`, salt);
    value.password = hash
  })
  return User;
};