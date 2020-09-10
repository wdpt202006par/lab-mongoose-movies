const express = require('express')
const router  = express.Router();
const Movie = require('../models/movie.js')
const Celebrity = require('../models/celebrity.js')


router.get('/movies', (req, res, next) => {
  Movie.find({})
  .then((allMoviesFromDb) => {
      res.render('movies/index', {
          movies: allMoviesFromDb
      })
  })
  .catch(err => {
      console.log('💥', err)
      next(err); // 
    })
  })


router.get('/movies/new', (req, res, next) => {
  Celebrity.find().then(celebritiesfromDb => {
    res.render('movies/new', {
      celebrities: celebritiesfromDb
    })
  }).catch(err => next(err))
  
 
})
    
  // POST /movies/new
router.post('/movies/new', (req, res, next) => {

  Movie.create({
      title: req.body.title, 
      genre: req.body.genre,
      plot: req.body.plot,
      cast: req.body.cast,
  }).then(newMovies => {
    
    res.redirect('/movies');
  }).catch(err => {
    // res.redirect('movies/new') // est-ce possible ?
    next(err);
  })
})

  module.exports = router;