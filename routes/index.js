const express = require('express')
const Controller = require('../controllers')
const router = express.Router()

router.use('/books', require('./books'))

router.get('/', (req, res) => {
  res.render('home')
})

router.get('/logout', Controller.logout)


router.get('/login', Controller.login)
router.post('/login', Controller.postLogin)
router.get('/register', Controller.register)
router.post('/register', Controller.saveUser)



module.exports = router