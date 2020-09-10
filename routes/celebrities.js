const express = require('express');

// require celebrities model
const router = express.Router();
const Celebrity = require('../models/Celebrity.model');

/* iteration 2 */
router.get('/celebrities', (req,res, next) => {
	Celebrity.find({})
	.then(celebritiesFromDb => {
		console.log('here are the celebrities', celebritiesFromDb);
		res.render('celebrities/index', {
			celebrities: celebritiesFromDb
		})
	})
	.catch((err) => {
		console.log('not working', err);
		next(err);
 });
})

//iteration 4
//afficher le formulaire
router.get('/celebrities/new', (req, res, next) => {
	res.render('celebrities/new');
});

//traitement du formulaire
router.post('/celebrities/new', (req, res, next) => {
	const {name, occupation, catchPhrase} = req.body;

	Celebrity.create({name, occupation, catchPhrase})
	.then(() => {
		res.redirect('/celebrities');
	})
	.catch(() => {
         res.redirect('/celebrities/new');
      });
});

//iteration 3
router.get('/celebrities/:id', (req, res, next) => {
	Celebrity.findById(req.params.id)
	.then(celebritiesFromDb => {
		res.render('celebrities/show', {
			celebrity: celebritiesFromDb
		});
	})
	.catch((err) => next(err));
});

//iteration 5
router.post('/celebrities/:id/delete', (req, res, next) => {
	Celebrity.findByIdAndDelete(req.params.id)
	.then(() => {
		res.redirect('/celebrities')
		console.log('deleted');
	})
	.catch(err => next(err))
})

//iteration 6
//afficher le formulaire
router.get('/celebrities/:id/edit', (req, res, next) => {
	Celebrity.findById(req.params.id)
	.then((celebrityFromDb) => {
		console.log('edit works');
		res.render('celebrities/edit', {
			celebrity: celebrityFromDb
		})
	})
	.catch(err => next(err))
})

//traitement du formulaire
router.post('/celebrities/:id/edit', (req, res, next) => {
	const {name, occupation, catchPhrase} = req.body;

	Celebrity.findByIdAndUpdate(req.params.id, {
		name: name,
		occupation: occupation,
		catchPhrase: catchPhrase
	}, {new: true})
	.then(updateCelebrity => {
		console.log('name', updateCelebrity.name);
		res.redirect(`/celebrities/${updateCelebrity.id}`)
	})
	.catch(err => next(err))
})

module.exports = router;