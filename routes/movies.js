const express = require('express')
const router  = express.Router();
const Movie = require('../models/movie.js')


router.get('/movies/new', (req, res, next) => {
    res.render('movies/new', {
    })
  })
    
  // POST /celebrities/new
//   router.post('/movies/new', (req, res, next) => {

//     Movie.create({
//         title: req.body.title, 
//         genre: req.body.genre,
//         plot: req.body.plot,
//         cast: req.body.cast,
//     }).then(newMovies => {
      
//       res.redirect('/movies');
//     }).catch(err => {
//       res.redirect('movies/new')
//       // next(err);
//     })
//   })

  module.exports = router;