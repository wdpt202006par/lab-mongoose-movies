const mongoose     = require('mongoose');


const celebritySchema = new mongoose.Schema({
    name:String,
    occupation:String,
    catchPhrase:String
})

const celebrityModel = mongoose.model('Celebrity',celebritySchema);

module.exports = celebrityModel