const express = require('express');
const router = express.Router();
const Movie = require('../models/movie');
const Celebrity = require('../models/celebrity');

router.get('/', (req, res, next) => {
    Movie.find({})
        .then((allMovies) => {
            res.render('movies/index', {
                movies: allMovies
            })
            console.log(allMovies)
        })
        .catch(err => next(err))
})

router.get('/new', (req, res, next) => {
    Celebrity.find({})
        .then((allCelebrities) => {
            res.render('movies/new', {
                celebrities: allCelebrities
            })
            console.log(allCelebrities);
        })
        .catch((err) => next(err));
})

router.post('/new', (req, res, next) => {
    Movie.create({
        title: req.body.title,
        genre: req.body.genre,
        plot: req.body.plot,
        cast: req.body.cast // ATTENTION CAST EST DEJA UN TABLEAU DEFINI DANS LE REFERENCEMENT A LA BASE DE DONNEE
    }).then(() => {
        res.redirect('/movies');
    }).catch(err => next(err))
})

router.get('/:id/delete', (req, res, next) => {
    Movie.findByIdAndDelete(req.params.id)
        .then(() => {
            res.redirect('/movies');
        })
        .catch(err => next(err));
})

router.get('/:id', (req, res, next) => {
    Movie.findById(req.params.id)
        .populate('cast')
        .then((movieDetails) => {
            res.render('movies/show', {
                movie: movieDetails
            })
            console.log(movieDetails)
            console.log("OK")
        })
        .catch(err => next(err))
})


module.exports = router;