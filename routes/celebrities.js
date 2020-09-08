const express = require('express');
const router  = express.Router();

const Celebrity = require('../models/celebrity.js');
const { ConnectionStates, connect } = require('mongoose');
const { findByIdAndUpdate } = require('../models/celebrity.js');



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

router.get('/celebrities/:id/edit', (req, res, next)=> {
    const id = req.params.id
    Celebrity.findOne({_id:id})
        .then((celebrity)=> {
            res.render('celebrities/edit', {celebrity: celebrity})
        })
        .catch(error => next(error));
})


router.post('/celebrities/:id/edit', (req, res, next) => {
    const {name, occupation, catchPhrase} = req.body;  
    Celebrity.findByIdAndUpdate(req.params.id, {
      name: name, 
      occupation: occupation,
      catchPhrase: catchPhrase
    }, {new: true})
    .then(updatedCelebrity => {
      res.redirect(`/celebrities/${updatedCelebrity.id}`)
    })
    .catch(err => next(err))
})


router.get('/celebrities/new', (req,res,next) => {
    console.log('connected!!!!')
    // res.send('dans le formulaire')
    res.render('celebrities/new', {})
})

router.post('/celebrities/new', (req,res,next) => {
    const {name, occupation, catchPhrase} = req.body;

    Celebrity.create({name, occupation, catchPhrase}).then(newCelebrity => {
        res.redirect('/celebrities')
    }).catch(err => {
        res.redirect('/celebrities/new') // when error in form to redirect to form
        next(err)})
})

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


router.post('/celebrities/:id/delete', (req, res) => {
    const  id  = req.params.id;
   
    Celebrity.findByIdAndDelete(id)
      .then(() => res.redirect('/celebrities'))
      .catch(error => next(error));
  });


module.exports = router;