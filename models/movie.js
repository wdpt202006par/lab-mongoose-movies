const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const movieSchema = new Schema({

})

const movieModel = mongoose.model('Movie', movieSchema)
module.exports = movieModel