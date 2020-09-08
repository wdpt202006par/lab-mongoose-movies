//iteration 7
const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const movieSchema = new Schema({
   title: String,
   genre: String,
   plot: String,
   cast: [{ type: Schema.Types.ObjectId, ref: 'Celebrities' }],
});

const movieModel = mongoose.model('Movie', movieModel);
module.exports = movieModel;
