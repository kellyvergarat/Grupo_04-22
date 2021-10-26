const {model, Schema}= require('mongoose');

module.exports = new model('user', new Schema({
    name : {type: String, required: true},
    email: {type: String, required: true},
    phone: String, 
    country: String, 
    city: String, 
    password: {type: String, required: true},
    avatar: String,
    notifications: Array
},{
    collection: 'users'
}));