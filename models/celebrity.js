const mongoose = require("mongoose");

const {Schema,model} = mongoose;

const celebritySchema = new Schema({
    name: String,
    occupation: String,
    catchPhrase: String,
})

const celebrity= mongoose.model("Celebrity", celebritySchema);

module.exports = celebrity;