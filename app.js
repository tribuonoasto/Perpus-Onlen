'use strict'

const express = require('express')
const router = require('./routes')
const app = express()
const session = require('express-session')
const PORT = process.env.PORT || 3000

app.set('view engine', 'ejs')
app.use(express.urlencoded({extended:false}));
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false,
  cookie: { 
    secure: false,
    sameSite: true 
  }
}))

app.use('/', router)

app.listen(PORT, () => {
  console.log(`Example app listening on PORT ${PORT}`)
})
