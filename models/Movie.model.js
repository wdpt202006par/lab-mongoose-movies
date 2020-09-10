const mongoose = require('mongoose');

// destructuring
// const { Schema } = mongoose; // destructuring
const Schema = mongoose.Schema;

const movieSchema = new Schema({
	title: String,
  genre: String,
	plot: String,
	cast: [ {type: Schema.Types.ObjectId, 
	ref: 'Celebrity'} ],
  // created_at: 
  // updated_at: 
}, {
  timestamps: true
})

const movieModel = mongoose.model('Movie', movieSchema);

module.exports = movieModel;