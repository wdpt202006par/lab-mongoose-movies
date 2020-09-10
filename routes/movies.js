const express = require ('express');
const router  = express.Router();

const Celebrity = require('../models/celebrity.js');
const Movie = require('../models/movie.js');

router.get('/movies/new', (req,res,next) => {
    Celebrity.find().then (allCelebritiesFromDb => {
        res.render('movies/new', {celebrities: allCelebritiesFromDb})
    }).catch(err => {
        console.log(err);
        next(err);
    })
    
});

router.post('/movies', (req, res, next) => {
    const {title, genre, plot, cast} = req.body;

    Movie.create({title, genre, plot, cast}).then(newMovie => {
        res.redirect('/movies')
    }).catch(err => {
        console.log(err);
        next(err);
    })

});

router.get('/movies', (req,res,next) => {
    Movie.find().then (allMoviesFromDb => {
        res.render('movies/index', {movies: allMoviesFromDb})
    }).catch(err => {
        console.log(err);
        next(err);
    })
    
});


module.exports = router;