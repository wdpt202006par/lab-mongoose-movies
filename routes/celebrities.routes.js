const express = require('express');
const router = express.Router();

const Celebrity = require('../models/Celebrity.model');

router.get('/celebrities', (req, res, next) => {
  Celebrity.find()
  .then((allTheCelebritiesFromDB) => {
    console.log('Retrieved Celebrities from DB:', allTheCelebritiesFromDB);
    res.render('celebrities/index', {celebrities: allTheCelebritiesFromDB});
  })
  .catch(error => {
    console.log('Error while getting the Celebrities from the DB: ', error);

    // Call the error-middleware to display the error page to the user
    next(error);
  });
});
  
module.exports = router;