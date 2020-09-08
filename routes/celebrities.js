const express = require('express')
const router  = express.Router();
const Celebrity = require('../models/celebrity.js')


router.get('/celebrities', (req, res, next) => {
    Celebrity.find({})
    .then((allCelebritiesFromDb) => {
        res.render('celebrities/index', {
            celebrities: allCelebritiesFromDb
        })
    })
    .catch(err => {
        console.log('💥', err)
        next(err); // 
      })
    })




// GET/celebrities/new
router.get('/celebrities/new', (req, res, next) => {
  res.render('celebrities/new', {
  })
})
  
// POST /celebrities/new
router.post('/celebrities/new', (req, res, next) => {
  Celebrity.create({
    name: req.body.name, 
    occupation: req.body.occupation,
    catchPhrase: req.body.catchPhrase,
  }).then(newCelebrity => {
    
    res.redirect('/celebrities');
  }).catch(err => {
    res.redirect('celebrities/new')
    // next(err);
  })
})

router.get('/celebrities/:id', (req, res, next) => {
  const id = req.params.id // le nom doit être le même que celui de la route

  Celebrity.findOne({_id: id})
  .then((celebrity) => {
    console.log('celebrity', celebrity)  
    res.render('celebrities/show', {
      celebrity: celebrity
    })
  })
  .catch(err => {
    console.log('boom', err);
    next(err);
  })
})

module.exports = router;
