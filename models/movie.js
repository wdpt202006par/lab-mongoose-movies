const mongoose = require('mongoose')

const Schema = mongoose.Schema

const movieSchema = mongoose.Schema({
    title: String, 
    genre: String, 
    plot: String,
    cast: [ { type : Schema.Types.ObjectId, ref: 'Celebrity' } ]

})

const movieModel = mongoose.model('Movie', movieSchema)

module.exports = movieModel;