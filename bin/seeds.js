const mongoose = require('mongoose')
const Celebrity = require('../models/celebrity.js')
const DB_NAME = 'lab-mongoose-movies'

mongoose.connect(`mongodb://localhost/${DB_NAME}`, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('youhou!')
});

const celebrities = [{
    name: 'Bruce Willis',
    occupation: 'Actor',
    catchPhrase: 'You can\'t undo the past... but you can certainly not repeat it'
  },
  {
    name: 'Bruce Springsteen',
    occupation: 'Singer',
    catchPhrase: 'Someday we\'ll look back on this and it will all seem funny.'
  },
  {
    name: 'Bruce Wayne',
    occupation: 'Superhero Millionaire',
    catchPhrase: 'It\'s not who I am underneath, but what I do that defines me.'
  }
]

Celebrity.create(celebrities)
  .then((celebritiesAdded) => {
    console.log(`${celebrities.length} celebrities added`)
    mongoose.connection.close()
  })
  .catch(err => {
    next(err)
  })