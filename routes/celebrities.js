const express = require('express');
const router  = express.Router();
const Celebrity = require('../models/Celebrity.model.js');

/* GET update celebrities list page */
router.get('/celebrities/:id/edit', (req, res, next) => {
    Celebrity.findById(req.params.id)
        .then(celebrityFromDB=> {
            res.render('celebrities/edit', {
                celebrity:celebrityFromDB
            })
        })
        .catch(err => {next(err)})
});
/* POST update celebrities list page */
router.post('/celebrities/:id/edit', (req, res, next) => {
    const {name, occupation, catchPhrase} = req.body;

    Celebrity.findByIdAndUpdate(req.params.id,{
        name,
        occupation,
        catchPhrase
    },{new : true})
    .then(updatedCelebrity => {
        res.redirect(`/celebrities/${updatedCelebrity.id}`)
    })
    .catch(err => {
        next(err)
    })
})
/* GET New celebrities list page */
router.get('/celebrities/new', (req, res, next) => {
    res.render('celebrities/new')
})
/* POST New celebrities list page */
router.post('/celebrities/new', (req, res, next) => {
    const {name, occupation, catchPhrase} = req.body;

    Celebrity.create({
        name,
        occupation,
        catchPhrase
    }).then(newCelebrity => {
        res.redirect('/celebrities')
    })
    .catch(err => {
        next(err)
    })
})

/* GET celebrities list page */
router.get('/celebrities', (req, res, next) => {

    Celebrity.find({})
    .then(allcelebritiesFromDB => {
        console.log(allcelebritiesFromDB)
        res.render('celebrities/index',
        {celebrities: allcelebritiesFromDB})
    })
    .catch(err => {next(err);}
    )
  
});
/* GET celebrities Details */
router.get('/celebrities/:id', (req, res, next) => {
    Celebrity.findById(req.params.id)
        .then(celebrityFromDB=> {
            res.render('celebrities/show', {
                celebrity:celebrityFromDB
            })
        })
        .catch(err => {next(err)})
});
/* POST celebrities Delete */
router.post('/celebrities/:id/delete', (req, res, next) => {
    Celebrity.findByIdAndDelete(req.params.id)
        .then(()=> {
            res.redirect('/celebrities')
        })
        .catch(err => {
            next(err)
        })
})


module.exports = router;
