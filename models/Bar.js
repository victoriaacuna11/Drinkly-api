const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');
const Schema = mongoose.Schema;

mongoose.plugin(slug);

let BarSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    working_hours: {
        type: String,
        required: true
    },
    rating: {
        type: String,
        required: true
    },
    cost:{
        type:String,
        required:true
    },
    phone:[{
        type:String,
        required:true
    }],
    pictures:[{
        type:String,
        required:true
    }],
    menu:[{
        name:String,
        description:String,
        price:Number,
        //required:true
    }],
    social_media:{
        insta:String,
        facebook:String,
        twitter:String,
        email:String
        //cualquier otro que se nos ocurra despues
    },
    available: {
        type: Boolean,
        required: true
    },
    associate: {
        type: Boolean,
        required: true
    },
    location:{
        direction:String,
        //No se si hacerlo asi con un el id
        zone:String
        //required:true
    },
    //No se si se pone
    views:{
        type:Number,
        required:true
    }
})

module.exports = mongoose.model('Bar', BarSchema)