const express = require('express')
const BookController = require('../controllers/bookcontroller')
const router = express.Router()

router.use((req, res, next) => {
  if(!req.session.user || !req.session.user.id) {
    const error = 'Need to login'
    res.redirect (`/login?errors=${error}`)
  } else {
    next()
  }
})

router.get('/', BookController.showAllBooks)

router.use((req, res, next) => {
  if(!req.session.user || req.session.user.role !== 'Admin') {
    const error = 'You have no access'
    res.redirect (`/login?errors=${error}`)
  } else {
    next()
  }
})

router.get('/add', BookController.createBook)
router.post('/add', BookController.saveBook)


module.exports = router