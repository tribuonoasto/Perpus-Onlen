'use strict'

const {User} = require('../models')
const bcrypt = require('bcryptjs');

class Controller {
  static login(req, res) {
    const {errors} = req.query
    res.render('login', {errors})
  }

  static postLogin(req, res) {
    const {username, password} = req.body 

    User.findOne({where: {username}})
      .then (user => {
        if(user) {
          if(bcrypt.compareSync(password, user.password)) {
            req.session.user = {id: user.id, role:user.role}
            return res.redirect('/books')
          } else {
            const errors = 'Invalid username or password'
            return res.redirect (`/login?errors=${errors}`)
          }
        } else {
          const errors = 'Invalid username or password'
          return res.redirect (`/login?errors=${errors}`)
        }
      })
      .catch(err => {
        res.send(err)
      })
  }

  static register(req, res) {
    const {errors} = req.query
    res.render ('register', {errors})
  }

  static saveUser(req, res) {
    const {username, email, password, role} = req.body

    User.create({username, email, password, role})
      .then (() => {
        res.redirect ('/')
      })
      .catch(err => {
        if(err.name == 'SequelizeValidationError') {
          const errors = err.errors.map(el => el.message)
          res.redirect(`/register?errors=${errors}`)
        } else if (err.name == 'SequelizeUniqueConstraintError') {
          const errors = `Username or Email is Already Used!`
          res.redirect(`/register?errors=${errors}`)
        }else { 
          res.send(err)
        }
      })
  }

  static logout (req, res ) {
    req.session.destroy ((err) => {
      if(err) {
        res.send(err)
      } else {
        res.redirect('/login')
      }
    })
  }
}

module.exports = Controller