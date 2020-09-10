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

router.get('/movies/:id', (req, res, next) => {
    const id = req.params.id;

    Movie.findOne({_id:id})
    .populate('cast')
    .then((movie) => {
        
        res.render('movies/show', {
            movie: movie
        })
    })
    .catch(err => {
        console.log('error', err);
        next(err);
    })
})



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
router.post('/movies/:id/delete', (req, res, next) => {
    const id = req.params.id;
    Movie.findByIdAndDelete(id).then(()=> {
        res.redirect('/movies')
    
    }). catch(err => next(err))
})

router.get('/movies/:id/edit', (req, res, next)=> {
    const id = req.params.id
    Movie.findOne({_id:id})
        .then((movie)=> {
            res.render('movies/edit', {movie: movie})
        })
        .catch(error => next(error));
})

router.post('/movies/:id', (req, res, next) => {
    const {title, genre, plot, cast} = req.body; 
    Movie.findByIdAndUpdate(req.params.id, {
      title: title, 
      genre: genre,
      plot: plot,
      cast: cast
    }, {new: true})
    .then(updatedMovie => {
      res.redirect(`/movies/${updatedMovie.id}`)
    })
    .catch(err => next(err))
})
module.exports = router;