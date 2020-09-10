const express = require('express');
const router  = express.Router();
const Movie = require('../models/Movie.js');
const Celebrity = require('../models/Celebrity.js');

/* GET home page */
router.get('/', (req, res, next) => {
  res.render('index');
});

/*Router d'affichage de la création d'un movie*/
router.get('/movies/new', (req, res, next) => {

  Celebrity.find({}).then(celebritiesFromDb => {
    res.render('movie-create', {celebrities: celebritiesFromDb})
  }).catch(err => next(err)) // find celebrity

})

router.post('/movies', (req, res, next) => {
  const {title, genre, plot, cast} = req.body; // variables

  Movie.create({
    title,
    genre,
    plot,
    cast
  }).then(newMovie => {
    res.redirect('/celebrities') // Mon nouveau film est crée et sera visible sur ma page de célébrités
  }).catch(err => next(err))
})


module.exports = router;
