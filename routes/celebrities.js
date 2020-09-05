const express = require('express')
const router  = express.Router();
const Celebrity = require('../models/celebrity.js')


router.get('/celebrities', (req, res, next) => {
    Celebrity.find({})
    .then((allCelebritiesFromDb) => {
        res.render('celebrities/index', {
            celebrities: allCelebritiesFromDb
        })
    })
    .catch(err => {
        console.log('💥', err)
        next(err); // 
      })
    })





module.exports = router;
