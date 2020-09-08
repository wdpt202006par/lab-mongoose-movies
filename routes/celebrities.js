const express = require('express');
const router  = express.Router();

const Celebrity = require('../models/celebrity.js');
const { ConnectionStates, connect } = require('mongoose');

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

router.get('/celebrities/:id', (req,res,next)=> {
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

});

router.get('/celebrities/new', (req,res,next) => {
    res.render('celebrities/new')
})

router.post('/celebrities/new', (req,res,next) => {
    const {name, occupation, catchPhrase} = req.body;

    Celebrity.create({name, occupation, catchPhrase}).then(newCelebrity => {
        res.redirect('/celebrities')
    }).catch(err =>next(err))
})

router.post('/celebrities/:id/delete', (req, res) => {
    const { id } = req.params;
   
    Celebrity.findByIdAndDelete(id)
      .then(() => res.redirect('/celebrities'))
      .catch(error => next(error));
  });


module.exports = router;