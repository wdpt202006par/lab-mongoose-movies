const mongoose = require('mongoose');

const Celebrity = require('../models/Celebrity.model');

const DB_NAME = 'celebrity-project';

mongoose.connect(`mongodb://localhost/${DB_NAME}`, {
	useCreateIndex: true,
	useNewUrlParser: true,
	useUnifiedTopology: true
}).then(() => {
	console.log('youhou!');
})

const celebrities = [
	{
    name: "Beyonce",
    occupation: "Singer",
    catchPhrase: "I am the Best",
  },
  { name: "Tom Cruise", occupation: "Actor", catchPhrase: "Hello man" },
	{ name: "Picasso", occupation: "Paintor", catchPhrase: "I love Ironhack" },
	{ name: "Emma Watson", occupation: "Actor", catchPhrase: "Hello everybody" }
];

Celebrity.create(celebrities)
	.then((allCelebritiesCreated) => {
		console.log(`All celebrities created`, allCelebritiesCreated);

		mongoose.connection.close();
	})
	.catch(err => {
		console.log('oops', err);
	})