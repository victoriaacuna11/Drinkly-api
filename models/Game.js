const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');
const Schema = mongoose.Schema;

mongoose.plugin(slug);

let GameSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    photo:{
        type: String,
        required: true
    },
    rules:[{
        type: String, 
        required: true
    }],
    available: {
        type: Boolean,
        required: true
    },
})

module.exports = mongoose.model('Game', GameSchema)