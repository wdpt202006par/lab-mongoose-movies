const express = require('express');
const router = express.Router();
const Movie = require('../models/Movie.model');
const Celebrity = require('../models/Celebrity.model.js');

// const { route } = require('.');

router.get('/movies', (req, res, next) => {
	Movie.find()
		.then(movies => {
			console.log({movies});
			res.render('movies/index', {movies})
		})
		.catch(err => new(err))
})

router.get('/movies/new', (req, res, next) => {
	Celebrity.find()
		.then(celebritiesFromDB => {
			console.log({celebritiesFromDB});
			res.render('movies/new', {celebrities: celebritiesFromDB})
		})
		.catch(err => new(err))
})

router.post('/movies', (req, res, next) => {
	console.log(req.body);
	const {title, genre, plot, cast} = req.body;

	Movie.create({
		title: title,
		genre: genre,
		plot: plot,
		cast: cast
	})
	.then(movie => {
		res.redirect('/movies')
	})
	.catch(err => new(err))
})

router.get('/movies/show/:id', (req, res, next) => {
	console.log(req.body);

	Movie.findById(req.params.id)
		.then(moviesFromDB => {
			console.log(moviesFromDB);
			res.render('movies/show', {
				movie: moviesFromDB
			})
		})
		.catch(err => next(err))
})

router.get('/movies/show/:id/delete', (req, res, next) => {
	Movie.findByIdAndDelete(req.params.id)
		.then(() => {
			console.log('Delete works');
			res.redirect('/movies')
		})
		.catch(err => next(err))
})

router.get('/movies/show/:id/edit', (req, res, next) => {
	Movie.findById(req.params.id)
		.then(moviesFromDB => {
			console.log('update shows');
			Celebrity.find()
		.then(celebritiesFromDB => {
			// parcours tous les celebrities de la base
			// console.log(celebritiesFromDB);
			celebritiesFromDB.forEach((celebrity, i) => {
				console.log(celebrity, i);
				if(moviesFromDB.cast.includes(celebrity.id)){
					celebrity.selected = true
				}
			})
			res.render('movies/edit', {
				movie: moviesFromDB,
				celebrities: celebritiesFromDB
			})
		}).catch(err => next(err))
	}).catch(err => next(err))
})

router.post('/movies/show/:id/edit', (req, res, next) => {
	const {title, genre, plot, cast} = req.body;

	console.log('coucou',cast)

	Movie.findByIdAndUpdate(req.params.id, {
		title: title,
		genre: genre,
		plot: plot,
		cast: cast
	}, {new: true})
		.then(updateMovies => {
			console.log('Update Works', updateMovies.title);
			//console.log(cast);
			res.redirect(`/movies/show/${updateMovies.id}`)
		})
		.catch(err => next(err))
})

module.exports = router;