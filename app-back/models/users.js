const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const jwtKey = require('../config/keys').jwtKey

const userSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true,
        maxlength:50
    },
    apellido: {
        type: String,
        required: true,
        minlength:3,
        maxlength: 50
    },
    cedula: {
        type: Number,
        required: true,
        minlength: 5,
        maxlength: 20,
        unique: true
    },
    email: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50,
        unique: true
    },
    telefono: {
        type: Number,
        required: true,
        minlength: 7,
        maxlength: 20
    },
    password: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 1024
    },
    enabled: {
        type: Boolean
    }
},
    {
        timestamps: true
    }
)

userSchema.methods.generateAuthToken = function() { 
    const token = jwt.sign({ _id: this._id, nombre: this.nombre, enabled: this.enabled}, jwtKey.jwtPrivateKey);
    return token;
}

const User = mongoose.model('User', userSchema);

exports.User = User;