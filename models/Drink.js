const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');
const Schema = mongoose.Schema;

mongoose.plugin(slug);

let DrinkSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    recipe: {
        type: String,
        required: true
    },
    ingredients:[{
        type:Schema.Types.ObjectId,
        ref:'Ingredient',
        requierd:true
    }],
    owner:{
        name:String,
        category:String,
        //require:true
    },
    pictures:{
        type: String,
        required:true
    },
    available: {
        type: Boolean,
        required: true
    },
    //No se si se pone
    views:{
        type:Number,
        required:true
    }
})

module.exports = mongoose.model('Drink', DrinkSchema)