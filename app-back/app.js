const express = require('express');
const db = require('./db/db')
const app= express();
require('dotenv').config();

db.connection();

app.use(express.json());
app.use('/admin', require('./routes/admin'));
app.use('/user', require('./routes/user'));
app.use('/employee', require('./routes/employee'));
app.use('/general', require('./routes/general'));

const PORT = process.env.PORT;
app.listen(PORT, console.log(`Server started on port ${PORT}`));
