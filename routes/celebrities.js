const express = require('express');
const router  = express.Router();

const Celebrity = require('../models/Celebrity.model');

router.get('/celebrities', (req, res, next) => {
    Celebrity.find({})
    .then( (allCelebrities) => {

        res.render('celebrities/index', {
            celebrities:allCelebrities
        })
    
    })
    .catch(err => next(err))
})


module.exports = router;