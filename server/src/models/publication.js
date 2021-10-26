const {model, Schema}= require('mongoose');

module.exports = new model('publication', new Schema({
    name : {type: String, required: true},
    email: {type: String, required: true},
    idUser: {type: String, required: true},
    url: {type: String, required: true},
},{
    collection: 'publications'
}));