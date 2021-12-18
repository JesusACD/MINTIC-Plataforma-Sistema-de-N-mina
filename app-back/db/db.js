const mongoose = require('mongoose');
const { mongodb } = require('../config/keys');


//local
//`mongodb://${mongodb.host}:${mongodb.port}/${mongodb.database}`
module.exports = {
    connection: ()=>{
        mongoose.connect(`mongodb+srv://${mongodb.username}:${mongodb.password}@cluster0.ioi7d.mongodb.net/${mongodb.database}?retryWrites=true&w=majority`, { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => console.log('Connected to MongoDB...'))
        .catch(err => console.error('Could not connect to MongoDB...', err));
    }
}
   

