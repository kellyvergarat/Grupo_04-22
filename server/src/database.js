const mongoose = require('mongoose');

let URI = 'mongodb+srv://Test-admin:test-admin@clustertest.ezgdr.mongodb.net/creatibook?retryWrites=true&w=majority';

mongoose.connect(URI)
    .catch(err => console.log('Error' + err));

mongoose.connection.on('open', ()=>{
    console.log('database is connected and open');
});

module.exports = mongoose;