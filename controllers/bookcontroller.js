'use strict'
const { Book, Category} = require('../models')

class BookController {
  static showAllBooks (req, res) {
    Book.findAll({ include: [Category]})
    .then(books => {
      res.render ('books', {books})
    })
    .catch(err => {
      res.send(err)
    }) 
  }

  static borrow(req, res) {

  }

  static createBook (req, res) {
    res.render ('book-add')
  }

  static saveBook (req, res) {
    res.render ('book-add')
  }
}

module.exports = BookController