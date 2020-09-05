const express = require('express');
const router  = express.Router();
const Celebrity = require('../models/Celebrity.model.js');

router.get('/celebrities/new', (req, res, next) => {
    res.render('celebrities/new')
})

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

router.get('/celebrities/:id', (req, res, next) => {
    Celebrity.findById(req.params.id)
        .then(celebrityFromDB=> {
            res.render('celebrities/show', {
                celebrity:celebrityFromDB
            })
        })
        .catch(err => {next(err)})
});

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
