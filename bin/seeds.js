const mongoose = require('mongoose')

const Celebrity = require('../models/Celebrity.model.js')

const DB_NAME = 'lab-mongoose-movies'

mongoose.connect(`mongodb://localhost/${DB_NAME}`, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('youhou!')
});

const celebrities = [
    {
        name: "Donald Trump",
        occupation: "President of USA",
        catchPhrase: "Make America great again!" 
    },
    {
        name: "Barack Obama",
        occupation: "44 th President of USA",
        catchPhrase: "Change we need!" 
    },
    {
        name: "George W. Bush",
        occupation: "43 th President of USA",
        catchPhrase: "I think we agree, the past is over." 
    }
]

Celebrity.create(celebrities)
  .then((allCelebritiesCreated) => {
    console.log(`Year, ${allCelebritiesCreated.length} celebrities have been created`)

    mongoose.connection.close()
  })
  .catch(err => {
    console.log('oops', err)
  })