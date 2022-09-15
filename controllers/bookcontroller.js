'use strict'
const { Book, Category} = require('../models')
const { Op } = require("sequelize")

class BookController {
  static showAllBooks (req, res) {

    const { search } = req.query
    const {id, role} = req.session.user

    let options = { include: [Category], where: {} }
    if(search) {
      options.where.title = {[Op.iLike]: `%${search}%`}
    }

    Book.findAll(options)
    .then(books => {
      res.render ('books', {books, id, role})
    })
    .catch(err => {
      res.send(err)
    }) 
  }

  static borrow(req, res) {
  
  }

  static createBook (req, res) {
    const {errors} = req.query

    Category.findAll()
      .then (categories => {
        res.render ('book-add', {categories, errors})
      })
      .catch (err => {
        res.send (err)
      })
  }

  static saveBook (req, res) {
    const {title, imgCover, description, CategoryId} = req.body
    Book.create({title, imgCover, description, CategoryId})
      .then (() => {
        res.redirect('/books')
      })
      .catch (err => {
        if(err.name == 'SequelizeValidationError') {
          const errors = err.errors.map(el => el.message)
          res.redirect(`/books/add?errors=${errors}`)
        }else { 
          res.send(err)
        }
      })
  }
}

module.exports = BookController