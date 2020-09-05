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

router.get('/celebrities/:id', (req, res, next) => {
    const celebid = req.params.id
    Celebrity.findById(celebid)
    .then((selectedCeleb) =>{
        res.render('celebrities/show', {
            celebrity: selectedCeleb
        })
    })
    .catch(err=>next(err))
})


module.exports = router;