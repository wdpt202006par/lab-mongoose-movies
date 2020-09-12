const mongoose     = require('mongoose');
require('../models/Celebrity.model');
const Schema = mongoose.Schema;

const movieSchema = new mongoose.Schema({
  title:String,
  genre:String,
  plot:String,
  cast:[ {type: Schema.Types.ObjectId, ref: 'Celebrity'} ],
})

const movieModel = mongoose.model('Movie',movieSchema);

module.exports = movieModel;