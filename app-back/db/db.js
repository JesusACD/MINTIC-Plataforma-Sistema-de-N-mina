const mongoose = require('mongoose');
const { mongodb } = require('../config/keys');

module.exports = {
    connection: ()=>{
        mongoose.connect(`mongodb://${mongodb.host}:${mongodb.port}/${mongodb.database}`)
        .then(() => console.log('Connected to MongoDB...'))
        .catch(err => console.error('Could not connect to MongoDB...'));
    }
}
   

