const express = require('express');
const router = express.Router();
const Celebrity = require('../models/celebrity');

// GET /celebrities
router.get('/', (req, res, next) => {
    Celebrity.find({})
        .then((allCelebrities) => {
            res.render('celebrities/index', {
                celebrities: allCelebrities
            })
        })
        .catch((err) => next(err));
})

router.get('/new', (req, res, next) => {
    res.render('celebrities/new', {})
})

router.post('/new', (req, res, next) => {
    Celebrity.create({
            name: req.body.name,
            occupation: req.body.occupation,
            catchPhrase: req.body.catchPhrase
        }).then(() =>
            res.redirect('/celebrities')
        )
        .catch((err) => {
            res.redirect('celebrities/new')
        })
})

router.get('/:id', (req, res, next) => {
    Celebrity.findById(req.params.id)
        .then((selectedCelebrity) => {
            res.render('celebrities/show', {
                selectedCelebrity: selectedCelebrity
            })
        })
        .catch((err) => next(err));
})

module.exports = router;