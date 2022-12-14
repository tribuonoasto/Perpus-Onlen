'use strict'
const {User, Book, Category, Profile} = require('../models')

class UserController {
  static showAllUser (req, res) {
    const options = {}
    options.include = Profile


    User.getUserBorrowingBooks(options)
      .then(users => {
        res.render('users', {users})
      })
      .catch (err => {
        res.send(err)
      })
  }

  static showUser (req, res) {
    const {id} = req.session.user
    const options = {}
    options.include = [Book, Profile]

    User.findByPk(id, options)
      .then (user => {
        res.render('user-profile', {user})
      })
      .catch (err => {
        res.send(err)
      })
  }

  static editUserProfile (req, res) {
    const {id} = req.session.user
    const options = {}
    options.include = Profile

    User.findByPk(id, options)
      .then (user => {
        res.render('user-profile-edit', {user})
      })
      .catch (err => {
        res.send(err)
      })
  }

  static saveUserProfile (req, res) {
    const {fullName, address} = req.body
    
    Profile.update({fullName, address}, {
      where: {
        UserId: +req.params.userId
      }
    })
    .then (()=> {
      res.redirect(`/users/profiles/${+req.params.userId}`)
    })
    .catch(err => {
      res.send(err)
    })   
  }
}


module.exports = UserController