const express = require('express');
const router  = express.Router();

const Celebrity = require('../models/celebrity.js')

router.get('/celebrities', (req,res,next) => {
    Celebrity.find({})
        .then((allCelebritiesFromDB) => {
            console.log(allCelebritiesFromDB)
            res.render('celebrities/index', {
                celebrities: allCelebritiesFromDB
            })
        })
        .catch(err => next(err))
});

module.exports = router;