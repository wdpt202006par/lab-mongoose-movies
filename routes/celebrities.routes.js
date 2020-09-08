const express = require('express');
const router = express.Router();

const Celebrity = require('../models/Celebrity.model');

router.get('/celebrities/new', (req, res, next) => {
  res.render('celebrities/new');
});

router.post('/celebrities/new', (req, res, next) => {
  const { name, occupation, catchPhrase } = req.body;

  Celebrity.create({ name, occupation, catchPhrase })
    .then(celebrityFromDB => {
      console.log(`New celebrity created: ${celebrityFromDB.name}.`);
      res.redirect('/celebrities');
    })
    .catch(error => next(error));
});


router.post('/celebrities/:id', (req, res, next) => {
  const { id } = req.params;
  const { name, occupation, catchPhrase } = req.body;

  Celebrity.findByIdAndUpdate(id, { name, occupation, catchPhrase }, { new: true })
  .then((theCelebrity) => {
    console.log(`Celebrity edited: ${theCelebrity.name}.`);
    res.redirect(`/celebrities/${theCelebrity.id}`);
  })
  .catch(error => {
    console.log('Error while editing celebrity details: ', error);
    next(error);
  });
});

router.get('/celebrities/:id', (req, res, next) => {
  const { id } = req.params;

  Celebrity.findById(id)
    .then((theCelebrity) => res.render('celebrities/show', { celebrity: theCelebrity }))
    .catch(error => {
      console.log('Error while retrieving celebrity details: ', error);

      next(error);
    });
});

router.get('/celebrities', (req, res, next) => {
  Celebrity.find()
  .then((allTheCelebritiesFromDB) => {
    console.log('Retrieved Celebrities from DB:', allTheCelebritiesFromDB);
    res.render('celebrities/index', {celebrities: allTheCelebritiesFromDB});
  })
  .catch(error => {
    console.log('Error while getting the Celebrities from the DB: ', error);
    next(error);
  });
});
  
module.exports = router;