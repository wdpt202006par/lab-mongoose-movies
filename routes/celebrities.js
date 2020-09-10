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
            res.redirect('/celebrities/new')
        })
})

//EDIT CELEBRITIES

router.get('/:id/edit', (req, res, next) => {
    Celebrity.findById(req.params.id)
        .then((selectedCelebrity) => {
            res.render('celebrities/edit', {
                selectedCelebrity: selectedCelebrity
            });
        })
        .catch(err => next(err))
})

router.post('/:id/edit', (req, res, next) => {
    Celebrity.findByIdAndUpdate(req.params.id, {
            name: req.body.name,
            occupation: req.body.occupation,
            catchPhrase: req.body.catchPhrase
        }, {
            new: true
        })
        .then((editedCelebrity) => {
            console.log('JE PASSE PAR LA')
            res.redirect('/celebrities')
        })
        .catch(err => next(err))
})


//DELETE CELEBRITIES

router.get('/:id/delete', (req, res, next) => {
    Celebrity.findByIdAndDelete(req.params.id)
        .then(() => {
            res.redirect('/celebrities');
        })
        .catch((err) => next(err));
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

router.post('/:id', (req, res, next) => {
    Celebrity.findByIdAndUpdate(req.params.id, {
            name: req.body.name,
            occupation: req.body.occupation,
            catchPhrase: req.body.catchPhrase
        }, {
            new: true
        })
        .then(() => {
            res.redirect('/celebrities');
        })
        .catch((err) => next(err))
})

module.exports = router;