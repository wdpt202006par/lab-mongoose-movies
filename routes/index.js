const express = require('express');
const Movie = require('../models/Movie.model');
const router  = express.Router();




/* GET home page */
router.get('/', (req, res, next) => {
  res.render('index');
});

router.get('/movies/new', (req, res, next) => {
  res.render('movies/new')
})

router.post('/movies/new', (req, res, next) => {
  const {title, genre, plot} = req.body;

  Movie.create({
    title,
    genre, 
    plot
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
