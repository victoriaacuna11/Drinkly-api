const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');
const Schema = mongoose.Schema;

mongoose.plugin(slug);

let ZoneSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    available: {
        type: Boolean,
        required: true
    }
})

module.exports = mongoose.model('Zone', ZoneSchema)