const express = require('express');
const router  = express.Router();
const Movie = require('../models/movie.js');
const Celebrity = require('../models/celebrity');




router.get('/new', (req, res, next) => {
    // res.render('movies/new')
    Celebrity.find({})
        .then(celebFromDb => {
        console.log('celebritées trouvées:', celebFromDb);
        res.render('movies/new', {
          celebFromDb
        }) // [ {...}, {...} ]
        })
        .catch((err) => next(err))
});
router.post('/new', (req, res, next) => {
	const {title, genre, plot, cast} = req.body;
	Movie.create({title, genre, plot, cast})
		.then(newMovie => {
			// res.send(`movie ${newMovie.title} créé`)
			res.redirect('/movies')
		})
		.catch(err => {next(err)})

})

router.get('/', (req, res, next) => {
    // res.render('movies/index')
    Movie.find({})
        .then(movies => res.render('movies/index', {
            movies
        }))
        .catch(err => next(err));
});


router.get('/:movieid', (req, res, next) => {
    const id = req.params.movieid;
    Movie.findOne({_id: id})
    .populate('cast')
    .then((movie) => {
        // console.log('movie recuperé:', movie)
        res.render('movies/movie-details', {
            movie
        })
    })
    .catch(err => next(err))
})

module.exports = router;