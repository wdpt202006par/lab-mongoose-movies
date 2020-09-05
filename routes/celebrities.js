const express = require('express');
const router  = express.Router();
const Celebrity = require('../models/Celebrity.model.js');

/* GET celebrities list page */
router.get('/celebrities', (req, res, next) => {

    Celebrity.find({})
    .then(allcelebritiesFromDB => {

        res.render('celebrities/index',
        {celebrities: allcelebritiesFromDB})
    })
    .catch(err => {next(err);}
    )
  
});

module.exports = router;
