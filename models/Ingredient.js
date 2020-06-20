const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');
const Schema = mongoose.Schema;

mongoose.plugin(slug);

let IngredientSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    available: {
        type: Boolean,
        required: true
    },
    photo:{
        type:String,
        required:true
    }, 
    category: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Ingredient', IngredientSchema)