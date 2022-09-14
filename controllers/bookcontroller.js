'use strict'

class BookController {
  static showAllBooks (req, res) {
    res.render ('books')
  }

  static createBook (req, res) {
    res.render ('book-add')
  }

  static saveBook (req, res) {
    res.render ('book-add')
  }
}

module.exports = BookController