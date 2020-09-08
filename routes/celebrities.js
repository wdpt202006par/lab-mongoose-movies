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

router.post('/celebrities', (req, res, next) => {
    const {name, occupation, catchPhrase} = req.body

    Celebrity.create({name, occupation, catchPhrase})
    .then((createdCelebrity)=>{
        res.redirect('/celebrities')
    })
    .catch(
        //res.redirect('/celebrities/new')
        console.log("ERROR! Redirecting to new page")
        
    )
})

router.get('/celebrities/new', (req, res, next) => {
    res.render('celebrities/new')
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

router.post('/celebrities/:id/delete', (req, res, next)=>{
    Celebrity.findByIdAndRemove(req.params.id)
    .then((removedCeleb)=>{
        res.redirect("/celebrities")
    })
    .catch(err=>next(err))
})

module.exports = router;