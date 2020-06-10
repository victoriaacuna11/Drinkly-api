const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');
const Schema = mongoose.Schema;

mongoose.plugin(slug);

let ImageSchema = new Schema({
    thumbnail: {
        type: String,
        required: true
    },
    path: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Image', BarSchema)