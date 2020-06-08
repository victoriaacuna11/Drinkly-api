const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');

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

const User = module.exports = mongoose.model('User', UserSchema);

module.exports.getUserById = function(id, callback){
    User.findById(id, callback);
}

module.exports.getUserByUsername = function(username, callback){
    const query = {user_name: username}
    User.findOne(query, callback);
}

module.exports.addUser = function(newUser, callback){
    bcrypt.genSalt(10, (err, salt)=>{
        bcrypt.hash(newUser.password, salt, (err, hash)=>   {
            if(err) throw err;
            newUser.password = hash;
            newUser.save(callback);
        })

    });
}

module.exports.checkPassword = function(c_password, hash, callback){
    bcrypt.compare(c_password, hash, (err, isMatch) => {
        if(err) throw err;
        callback(null, isMatch);
    });
}