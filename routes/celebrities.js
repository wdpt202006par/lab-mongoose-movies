const express = require('express');
const router  = express.Router();
const Celebrity = require('../models/celebrity');

router.get('/:id/edit', (req, res, next) => {
	Celebrity.findById(req.params.id)
		.then(toEdit => {
			res.render('celebrities/edit', {
				toEdit:toEdit
			})
		})
		.catch(err => next(err))
})

router.post('/:id/edit', (req, res, next) => {
	const {name, occupation, catchPhrase} = req.body;
	Celebrity.findByIdAndUpdate(req.params.id, {name, occupation, catchPhrase}, {new: true})
	.then(updCeleb=> {
		console.log('name:', updCeleb.name )
		res.redirect(`/celebrities/${updCeleb.id}`)
	})
	.catch(err => next(err))
})


router.get('/new', (req, res, next) => {
	res.render('celebrities/new', {})
})
router.post('/new', (req, res, next) => {
	// ... some code goes here
	const {name, occupation, catchPhrase} = req.body;
	Celebrity.create({name, occupation, catchPhrase})
		.then(newCeleb => {
			// res.send(`celeb ${newCeleb.name} créé`)
			res.redirect('/celebrities')
		})
		.catch(err => {next(err)})

})

router.get('/', (req, res, next) => {
	Celebrity.find({})
		.then(celebrities => res.render('celebrities/index', {
			celebrities
		}))
		.catch(err => next(err));
});

router.get('/:celebid', (req, res, next) =>{
	const id= req.params.celebid  //5f539ec79ea64d194a3afc83
	Celebrity.findOne({_id: id})
		.then((celebrity) => {
			console.log('celebrity:', celebrity	)
			res.render('celebrities/celeb-details', {
				celebrity
			})
		})
		.catch((err) =>  {
			console.log('boom', err);
			next(err);
		})
})

router.post('/:id/delete', (req, res, next) =>{
	console.log(id)
	Celebrity.findByIdAndDelete(req.params.id)
		.then(() =>{
			res.redirect('/celebrities')
		})
		.catch(err => next(err))
})


module.exports = router;