const express = require('express');
const Movie = require('../models/Movie.model');
const router  = express.Router();
const Celebrity = require('../models/Celebrity.model');



/* GET home page */
router.get('/', (req, res, next) => {
  res.render('index');
});

router.get('/movies/new', (req, res, next) => {
  Celebrity.find({})
    .then(celebritiesFromDB => { 
      res.render('movies/new',
      {celebrities: celebritiesFromDB})})
  .catch(err => next(err))
})

router.post('/movies/new', (req, res, next) => {
  const {title, genre, plot, cast} = req.body;

  Movie.create({
    title,
    genre, 
    plot,
    cast
  })
    .then(newMovie => {
      console.log(newMovie)
      res.redirect('/movies')
    })
    .catch(err => next(err))
})

router.get('/movies', (req, res, next) => {

  Movie.find({})
  .then(allmoviesFromDB => {
      res.render('movies/index',
      {movies: allmoviesFromDB})
  })
  .catch(err => {next(err);}
  )

});

module.exports = router;
