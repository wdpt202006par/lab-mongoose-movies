const express = require('express');
const router = express.Router();
const Movie = require('../models/Movie.js');

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

router.post('/:id/delete',(req,res,next)=> {
    Movie.findByIdAndRemove(req.params.id).then(movie => {
        res.redirect('/movies')
    }).catch(err => next(err))
})

module.exports = router;