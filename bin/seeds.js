const mongoose = require('mongoose')

const Celebrity = require('../models/celebrity.js')

const DB_NAME = 'celebrity-movie'

mongoose.connect(`mongodb://localhost/${DB_NAME}`, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('youhou!')
});

const celebrities = [
    {
        name: 'Beyonce',
        occupation: 'Singer',
        catchPhrase: 'I love singing',
    },
    {
        name: 'Tom Cruise',
        occupation: 'Actor',
        catchPhrase: 'I love acting',
    },
    {
        name: 'Zidane',
        occupation: 'Footballer',
        catchPhrase: 'I love football',
    }
]

Celebrity.create(celebrities)
    .then((allCelebritiesCreated) => {
        console.log(`${allCelebritiesCreated} have been created`)

        mongoose.connection.close()
    })
    .catch(err => {
        console.log('error', err)
    })
