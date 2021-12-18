const mongoose = require('mongoose');
const { mongodb } = require('../config/keys');

module.exports = {
    connection: ()=>{
        //`mongodb://${mongodb.host}:${mongodb.port}/${mongodb.database}`
        //`mongodb+srv://${mongodb.username}:${mongodb.password}@cluster0.ioi7d.mongodb.net/${mongodb.database}?retryWrites=true&w=majority`
        mongoose.connect(`mongodb://${mongodb.host}:${mongodb.port}/${mongodb.database}`, { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => console.log('Connected to MongoDB...'))
        .catch(err => console.error('Could not connect to MongoDB...', err));
    }
}
   

