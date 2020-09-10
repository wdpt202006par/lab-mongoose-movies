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

const celebrities = [
  {
    name: "Tom Cruise",
    occupation: "Actor",
    catchPhrase: "I Feel The Need… The Need For Speed!"
  },
  {
    name: "Beyonce",
    occupation: "Singer",
    catchPhrase: "If everything was perfect, you would never learn and you would never grow."
  },
  {
    name: "Daffy Duck",
    occupation: "Cartoon character",
    catchPhrase: "Woo-hoo! Woo-hoo! Woo-hoo! Woo-hoo! Woo-hoo!" 
  }
];

Celebrity.create(celebrities)
  .then((allCelebritiesCreated) => {
    console.log(`Year, ${allCelebritiesCreated.length} have been created`)

    mongoose.connection.close()
  })
  .catch(err => {
    console.log('oops', err)
  })