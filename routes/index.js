const express = require('express');
const Movie = require('../models/Movie.model');
const router  = express.Router();
const Celebrity = require('../models/Celebrity.model');



/* GET home page */
router.get('/', (req, res, next) => {
  res.render('index');
});

/* GET Movie Details*/
router.get('/movies/:id', (req, res, next) => {
  const id = req.params.id;
  Movie.findOne({_id: id})
  .populate('cast')
      .then(movieFromDB => {
          res.render('movies/show', {
              movie:movieFromDB
          })
      })
      .catch(err => {next(err)})
});
/* GET Add movie*/
router.get('/movies/new', (req, res, next) => {
  Celebrity.find({})
    .then(celebritiesFromDB => { 
      res.render('movies/new',
      {celebrities: celebritiesFromDB})})
  .catch(err => next(err))
})
/* GET Add movie*/
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

/* GET Movies list*/
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
