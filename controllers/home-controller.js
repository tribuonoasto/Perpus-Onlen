"use strict"
const { Profile } = require('../models')

class HomeController {
    static home(req,res){
        res.render('home')
    }
}

module.exports = HomeController