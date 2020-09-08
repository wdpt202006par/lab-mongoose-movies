const express = require('express');
const router = express.Router();
const Movie = require('../models/movie');

router.get('/new', (req, res, next) => {
    Celebrity.find({})
    .then((allCelebrities) => {
        res.render('movies/new', {
            celebrities : allCelebrities}
        ) // FAIRE LA VUE MOVIES/NEW.hbs (rechecker Ite 8)
    })
    .catch()
})