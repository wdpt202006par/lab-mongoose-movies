const express = require('express');
const router = express.Router();
const Celebrity = require('../models/Celebrity.js');


router.get('/', (req, res, next) => {
    Celebrity.find({

    }).then(celebritiesFromDb => {
        res.render('celebrities/index', {
            celebritiesFromDb: celebritiesFromDb
        })
    }).catch(err => next(err))
})

router.get('/new', (req, res, next) => {
    res.render('celebrities/new')
})

router.post('/', (req, res, next) => {
    Celebrity.create({
        name: req.body.name,
        occupation: req.body.occupation,
        catchPhrase: req.body.catchPhrase
    }).then(newCelebrity => {
        res.redirect('/celebrities')
    }).catch(err => {
        next(err)
    })
})

router.post('/:id/delete', (req, res, next) => {
    Celebrity.findByIdAndRemove(req.params.id).then(() => {
        res.redirect('/celebrities')
    }).catch(err => next(err))
})


router.get('/:id/edit', (req, res, next) => {
    Celebrity.findById(req.params.id).then((oneCelebrity) => {
        console.log(oneCelebrity)
        res.render('celebrities/edit', {
            oneCelebrity:oneCelebrity
        })
    }).catch(err => next(err))
})




router.post('/:id/edit', (req, res, next) => {

    Celebrity.findByIdAndUpdate(req.params.id, {
        name: req.body.name,
        occupation: req.body.occupation,
        catchPhrase: req.body.catchPhrase
    }).then((celebrityUpdated) => {
        res.redirect(`/celebrities/${celebrityUpdated.id}`)
    }).catch(err => next(err))
})





router.get('/:id', (req, res, next) => {
    Celebrity.findById(req.params.id).then((oneCelebrity) => {
        console.log(oneCelebrity)
        res.render('celebrities/show', {
            oneCelebrity: oneCelebrity
        })
    }).catch(err => {
        next(err)
    })
})




module.exports = router;