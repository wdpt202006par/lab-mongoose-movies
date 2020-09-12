const mongoose     = require('mongoose');
const Celebrity = require('../models/Celebrity.model');

const DB_NAME = ('mongoose-movies')

mongoose.connect(`mongodb://localhost/${DB_NAME}`, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(()=>{
  console.log('youhouuu')
});

const celebrities  =[
  {
    name:'Bruce Willis',
    occupation:'actor',
    catchPhrase:'Yippie-Kai-Yay, Motherfucker!'
},
{
    name:'Chuck Norris',
    occcupation:'ranger',
    catchPhrase:'If I wanted your opinion, I’d beat it outta ya'
},
{
    name:'JCVD',
    occcupation:'governor',
    catchPhrase:'Une noisette, j’la casse entre mes fesses tu vois...'
}
];

Celebrity.create(celebrities).then(allcelebritiescreated =>{
    console.log(`created ${allcelebritiescreated}`);
    mongoose.connection.close()

}).catch(err =>{
  console.log('oops',err)
})