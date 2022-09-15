'use strict'
const { Book, Category} = require('../models')
const { Op } = require("sequelize")

class BookController {
  static showAllBooks (req, res) {
    const { search } = req.query

    let options = { include: [Category], where: {} }
    if(search) {
      options.where.title = {[Op.iLike]: `%${search}%`}
    }

    Book.findAll(options)
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