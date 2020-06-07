const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');
const Schema = mongoose.Schema;

mongoose.plugin(slug);


let UserSchema = new Schema({
    f_name: {
        type: String,
        required: true
    },
    l_name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique:true
    },
    user_name:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    birthday:{
        type:Date,
        required:true
    },
    favorites:[{
        type:Schema.Types.ObjectId,
        ref:'Drink'
    }],
    available: {
        type: Boolean,
        required: true
    }
})

module.exports = mongoose.model('User', UserSchema)