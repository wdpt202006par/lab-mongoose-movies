const express = require('express');
const router  = express.Router();

const Celebrity = require('../models/Celebrity.model');
const Movie = require('../models/Movie.model');


router.get('/movies/new', (req, res, next) =>{

    Celebrity.find({})
    .then(
        celebrities => {
            res.render('movies/new', {
                celebrities:celebrities})
    })
    .catch(err=>next(err))
})

router.post('/movies', (req, res, next) => {
    const {title, genre, plot, cast} = req.body // destructuring
    
    console.log(cast) // ["1234", "4567"]
    
    Movie.create({title, genre, plot, cast})
    .then(res.redirect('/movies'))
    .catch(err=>next(err))
})

router.get('/movies', (req, res, next) =>{
    Movie.find()
    .then(moviesFromDb=>{
        res.render('movies', {
            movies:moviesFromDb
        })
    })
    .catch(err=>next(err))
})
module.exports = router;