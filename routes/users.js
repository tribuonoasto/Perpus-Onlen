const express = require('express')
const UserController = require('../controllers/usercontroller')
const router = express.Router()

router.use((req, res, next) => {
  if(!req.session.user || !req.session.user.id) {
    const error = 'Need to login'
    res.redirect (`/login?errors=${error}`)
  } else {
    next()
  }
})

router.get('/profiles/:userId', UserController.showUser)
router.get('/profiles/:userId/edit', UserController.editUserProfile)
router.post('/profiles/:userId/edit', UserController.saveUserProfile)

router.use((req, res, next) => {
  if(!req.session.user || req.session.user.role !== 'Admin') {
    const error = 'You have no access'
    res.redirect (`/login?errors=${error}`)
  } else {
    next()
  }
})

router.get('/', UserController.showAllUser)

module.exports = router