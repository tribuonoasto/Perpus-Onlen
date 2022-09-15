"use strict"
const { Profile } = require('../models')

class HomeController {
    static home(req,res){
        Profile.findAll()
        .then(profiles => {
            // console.log(profiles)
            // res.send(profiles)
            res.render('home', { profiles })
        })
        .catch(err => {
            res.send(err)
        }) 
    }
}

module.exports = HomeController