const express = require('express');
const router = express.Router();
const Movie = require('../models/Movie.js');
const Celebrity = require('../models/Celebrity.js');

router.get('/:id', (req, res, next) => {
    const id = req.params.id
    Movie.findById({
        _id: id
    }).populate('cast').then(movie => {
        res.render('movies/show', {
            movie: movie
        })
    }).catch(err => {
        console.log('boom')
        next(err)
    })
})

// Route de traitement du delete
router.post('/:id/delete', (req, res, next) => {
    Movie.findByIdAndRemove(req.params.id).then(movie => {
        res.redirect('/movies')
    }).catch(err => next(err))
})

// Route d'affichage du formulaire d'édition d'un movie
router.get('/:id/edit', (req, res, next) => {
    Movie.findById(req.params.id).populate('cast').then(movie => {
        Celebrity.find().then(celebritiesFromDB => {
                celebritiesFromDB.forEach((celebrity, i) => {
                    console.log(celebritiesFromDB)
                    // <option selected="selected">
                    // rajouter un champ `selected` aux celebrités qui sont ds le film
                    const filmCelebritiesIds = movie.cast.map(el => el.id)
                    if (filmCelebritiesIds.includes(celebrity.id)) {
                        celebrity.selected = true
                    }
                })
                res.render('movies/edit', {
                    movie: movie
                })
            })
            .catch(err => next(err))
    }).catch(err => next(err))
})

module.exports = router;