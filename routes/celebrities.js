const express = require('express');
const router = express.Router();
const Celebrity = require('../models/Celebrity.js');


router.get('/', (req, res, next) => {
Celebrity.find({

}).then(celebritiesFromDb => {
    res.render('celebrities/index', {
        celebritiesFromDb: celebritiesFromDb
    })
}).catch(err => next(err))   
})

module.exports = router;


