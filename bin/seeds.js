//iteration 1
const mongoose = require("mongoose");
const Celebrity = require("../models/celebrity");
require("../configs/db.config");

const firstArray = [
  {
    name: "Beyonce",
    occupation: "Singer",
    catchPhrase: "I am the Best",
  },
  { name: "Tom Cruise", occupation: "Actor", catchPhrase: "Hello man" },
  { name: "Picasso", occupation: "Paintor", catchPhrase: "I love Ironhack" },
];

Celebrity.create(firstArray)
  .then((celebritiesFromDb) => {
    console.log("first array is create", celebritiesFromDb);
    mongoose.connection.close();
  })
  .catch((err) => console.log(err));
