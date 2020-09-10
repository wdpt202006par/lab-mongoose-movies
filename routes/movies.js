const express = require('express')
const router  = express.Router();
const Movie = require('../models/movie.js')
const Celebrity = require('../models/celebrity.js')

router.get('/movies/:id/edit', (req, res, next) => {
  Movie.findById(req.params.id).then(movieFromDb => {
    Celebrity.find().then(celebritiesFromDb => {

      // parcours tous les auteurs de la base
      celebritiesFromDb.forEach((cast, i) => {
        if (movieFromDb.cast.includes(cast.id)) {
          cast.selected = true
        }
      })

      res.render('movies/edit', {
        movie: movieFromDb,
        cast: celebritiesFromDb
      })
    }).catch(err => next(err))

    
  }).catch(err => next(err))
  
})

router.post('/movies/:id/edit', (req, res, next) => {
  // maj en base le livre avec les donnees du formulaire

  Movie.findByIdAndUpdate(req.params.id, {
    title: req.body.title, 
    genre: req.body.genre,
    plot: req.body.plot,
    cast: req.body.cast,
  }, {new: true}).then(updatedMovie => {
    console.log('title', updatedMovie.title)
    // livre maj
    res.redirect(`/movies/${updatedMovie.id}`)
  }).catch(err => next(err))
})

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

router.get('/movies/:id', (req, res, next) => {
  const id = req.params.id // le nom doit être le même que celui de la route

  Movie.findOne({_id: id})
  .populate('cast')
  .then((allMoviesFromDb) => {
    // console.log('movies', movie)
    res.render('movies/show', {
      movie: allMoviesFromDb
    })
  })
  .catch(err => {
    console.log('booooooooom', err);
    next(err);
  })
})

router.post('/movies/:id/delete', (req, res, next) => {
  // 
  Movie.findByIdAndDelete(req.params.id).then(() => {
    res.redirect('/movies')
  }).catch(err => next(err))
})


  module.exports = router;