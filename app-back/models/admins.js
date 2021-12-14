const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const jwtKey = require('../config/keys').jwtKey

const adminSchema = new mongoose.Schema({
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
    isAdmin: {
        type: Boolean,
        default: true
    }
},
    {
        timestamps: true
    }
)

adminSchema.methods.generateAuthToken = function() { 
    const token = jwt.sign({ _id: this._id, nombre: this.nombre, isAdmin: this.isAdmin}, jwtKey.jwtPrivateKey);
    return token;
}

const Admin = mongoose.model('Admin', adminSchema);

exports.Admin = Admin;