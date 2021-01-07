const mongoose = require('mongoose');
const Celebrity = require('../models/Celebrity.model');

const DB_NAME = 'lab-mongoose-movies';

mongoose.connect(`mongodb://localhost/${DB_NAME}`, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Youhou');
});

const celebrities = [
  {
    name: 'Angelina Jolie',
    occupation: 'actress',
    catchPhrase: "Therapy? I don't need that. The roles that I choose are my therapy."
  },
  {
    name: 'Bradley Cooper',
    occupation: 'actor',
    catchPhrase: "Comedy is music."
  },
  {
    name: 'Elon Musk',
    occupation: 'businessman',
    catchPhrase: "If you get up in the morning and think the future is going to be better, it is a bright day. Otherwise, it's not."
  }
];

Celebrity.create(celebrities)
  .then(celebritiesFromDB => {
  console.log(`Created ${celebritiesFromDB.length} celebrities`);
  mongoose.connection.close();
  })
  .catch(err => console.log(`An error occurred while creating celebrities from the DB: ${err}`));