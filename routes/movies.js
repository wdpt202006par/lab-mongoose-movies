const express = require('express');

// require celebrities model
const router = express.Router();
const Movie = require('../models/movie');
const Celebrity = require('../models/celebrity');

//ROUTER L'INDEX movie.js
//iteration 9-
router.get('/movies', (req, res, next) => {
   Movie.find({})
      .then((allMoviesFromDb) => {
         console.log(allMoviesFromDb);
         res.render('movies/index', { movies: allMoviesFromDb });
      })
      .catch((err) => next(err));
});

//CREER UNE MOVIE
//iteration  8
//afficher le formulaire
router.get('/movies/new', (req, res, next) => {
   Celebrity.find()
      .then((celebritiesFromDb) => {
         console.log('celebritiesFromDb are', celebritiesFromDb);
         res.render('movies/movie-create', { celebrities: celebritiesFromDb });
      })
      .catch((err) => next(err));
});

//traitement du formulaire
router.post('/movies/new', (req, res, next) => {
   const title = req.body.title;
   const plot = req.body.plot;
   const genre = req.body.genre;
   const cast = req.body.cast;
   Movie.create({
      title: title,
      genre: genre,
      plot: plot,
      cast: cast,
   })
      .then(() => res.redirect('/movies'))
      .catch((err) => next(err));
});

//DELETE A MOVIE
//iteration 11
router.post('/movies/:id/delete', (req, res, next) => {
   const id = req.params.id;
   Movie.findByIdAndRemove(id)
      .then(() => res.redirect('/movies'))
      .catch((err) => next(err));
});

//EDIT A MOVIE
//iteration 12
router.get('/:id/edit', (req, res, next) => {
   const id = req.params.id;
   Movie.findOne({ _id: id })
      .populate('cast')
      .then((movie) => {
         //chercher la liste des célébrities
         Celebrity.find({})
            .then((celebrities) => {
               celebrities.forEach((celebrity, i) => {
                  const movieCastIds = movie.cast.map((celebrity) => celebrity.id); // ["1234", "3456", ...] pour ne récuperer que les id des célébrités
                  if (movieCastIds.includes(celebrity.id)) {
                     //movie.cast[i]._id et un objet, celebrity._id est une string
                     celebrity.selected = true;
                  }
               });
               res.render('movies/edit', {
                  movie: movie,
                  celebrity: celebrities,
               });
            })
            .catch((err) => {
               next(err);
            });
      })
      .catch((err) => {
         next(err);
      });
});

router.post('/:id/edit', (req, res, next) => {
   const { title, genre, plot, cast } = req.body;
   Movie.findByIdAndUpdate(
      req.params.id,
      { title: title, genre: genre, plot: plot, cast: cast },
      { new: true }
   )
      .then(() => {
         res.redirect('/movies');
      })
      .catch((err) => next(err));
});

//VOIR LE DETAIL DE CHAQUE MOVIE
//iteration 10
router.get('/movies/:id', (req, res, next) => {
   const id = req.params.id;
   Movie.findOne({ _id: id })
      .populate('cast')
      .then((movie) => {
         res.render('movies/show', { movie: movie });
      })
      .catch((err) => next(err));
});

module.exports = router;
