const mongoose = require("mongoose");

const Celebrity = require("../models/celebrity.js");
const Movie = require("../models/movie.js");

const DB_NAME = "LAB-MONGOOSE-MOVIES";

mongoose.connect(`mongodb://localhost/${DB_NAME}`, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true 
})
.then(() => {
    console.log("is connected")
})
.catch(err => console.log("DB is not connected") )



const celebrities= [{
    name: "Cristiano Ronaldo",
    occupation: "Football",
    catchPhrase: "I am not a perfectionist, but I like to feel that things are done well. More important than that, I feel an endless need to learn, to improve, to evolve, not only to please the coach and the fans, but also to feel satisfied with myself. It is my conviction that here are no limits to learning, and that it can never stop, no matter what our age."
},{
    name: "wafaa" ,
    occupation: "coding",
    catchPhrase:"Pousser les âmes humaines à livrer de la valeur. Collaborons ensemble pour rendre le monde un endroit meilleur"
},{
    name: "Brigitte Macron",
    occupation: "first lady" ,
    catchPhrase: "I'm really into fashion, and there's this fascination the world over around this idea of the French woman. "
}]
// const allCelebrities = celebrities.map(celeb => celeb.name); 

Celebrity.create(celebrities)
.then((allCelebrity) => {
    console.log(`celebrities : ${allCelebrity}`)
    mongoose.connection.close();
})
.catch(err => console.log(`oops ${err}`))
