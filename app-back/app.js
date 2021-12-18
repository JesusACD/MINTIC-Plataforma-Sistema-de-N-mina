const express = require('express');
const db = require('./db/db')
const app= express();

db.connection();

app.use(express.json());
app.use('/', require('./routes/index'))
app.use('/admin', require('./routes/admin'));
app.use('/user', require('./routes/user'));
app.use('/employee', require('./routes/employee'));
app.use('/general', require('./routes/general'));

const PORT = process.env.PORT || 3001;
app.listen(PORT, console.log(`Server started on port ${PORT}`));
