const mongoose = require('mongoose');

// destructuring
// const { Schema } = mongoose; // destructuring
const Schema = mongoose.Schema;

const celebritySchema = new Schema({
	name: String,
  occupation: String,
  catchPhrase: String,
  // created_at: 
  // updated_at: 
}, {
  timestamps: true
})

const celebrityModel = mongoose.model('Celebrity', celebritySchema);

module.exports = celebrityModel;