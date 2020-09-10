const express = require('express');
const router = express.Router();
const Movie = require('../models/movie');
const Celebrity = require('../models/celebrity');

router.get('/new', (req, res, next) => {
    Celebrity.find({})
        .populate('Cast')
        .then((allCelebrities) => {
            res.render('movies/new', {
                celebrities: allCelebrities
            }) // FAIRE LA VUE MOVIES/NEW.hbs (rechecker Ite 8)
            console.log(allCelebrities);
        })
        .catch((err) => next(err));
})

router.post('/new', (req, res, next) => {
    Movie.create({
        title: req.body.title,
        genre: req.body.genre,
        plot: req.body.plot,
        cast: [req.body.cast]
    }).then(() => {
        res.redirect('/movies');
    })

})

module.exports = router;