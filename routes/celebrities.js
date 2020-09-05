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

router.get('celebrities/:id', (req,res,next)=> {
    const id = req.params.id
    
    Celebrity.findOne({_id:id})
        .then((celebrity) => {
            console.log('celebrity', celebrity)
         
            res.render('celebrities/show', {
                celebrity: celebrity
            })
        })
        .catch(err => {
            console.log('error', err);
            next(err);
        })

})


module.exports = router;