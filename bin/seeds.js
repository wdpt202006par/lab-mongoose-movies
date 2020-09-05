const mongoose = require('mongoose')
const Celebrity = require('../models/Celebrity.js')

const DB_NAME = "lab-mongoose-movies"

mongoose.connect(`mongodb://localhost/${DB_NAME}`, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('youhou')
})


const celebrities = [{
        name: "Elon Musk",
        occupation: "CEO of Tesla",
        catchPhrase: "Persistence is very important. You should not give up unless you are forced to give up."
    },
    {
        name: "Bill Gates",
        occupation: "CEO of Microsoft",
        catchPhrase: "Success is a lousy teacher. It seduces smart people into thinking they can't lose"
    },
    {

        name: "Steeve Jobs",
        occupation: "CEO of Apple",
        catchPhrase: "Don't judge each day by the harvest you reap but by the seeds that you plant."

    }
]

Celebrity.create(celebrities).then(allCelebrities => {
        console.log(`réussi !! ${allCelebrities.length}`)
        mongoose.connection.close;
    })
    .catch(err => {
        console.log('ooops', err)
    })