const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    first_name: {
        type: String, 
    },
    last_name : {
        type: String, 
    },
    email : {
        type: String,
        index: true, 
        unique: true
    }, 
    password: {
        type: String, 
    },
    age : {
        type: Number, 
    },
    cart: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'carts'
    },
    role: {
        type: String,
    }
});

const userModel = mongoose.model('users', userSchema);

module.exports = userModel;
//