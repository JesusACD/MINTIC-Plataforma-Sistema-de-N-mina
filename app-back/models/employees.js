const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const jwtKey = require('../config/keys').jwtKey

const employeeSchema = new mongoose.Schema({
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
    cargo: {
        type: String,
        required: true,
        minlength: 4,
        maxlength: 30,
    },
    salario: {
        type: Number,
        required: true,
        min:0,
        maxlength:10
    },
    fecha_contrato: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 1024
    },
    status: {
        type: String
    },
    enabled: {
        type: Boolean,
        default: true
    },
    vacations: {
        type: Boolean,
        default: false
    },
    pagos_extras_mes: {
        type: Number,
        default: 0
    },
    permissions_nrem:{
        type: Number,
        default: 0
    },
    pnr_mes: {
        type: Number,
        default: 0
    },
    permissions_rem : {
        type: Number,
        default: 0
    }
},
    {
        timestamps: true
    }
)

employeeSchema.methods.generateAuthToken = function() { 
    const token = jwt.sign({ _id: this._id, nombre: this.nombre, status: this.status}, jwtKey.jwtPrivateKey);
    return token;
}

const Employee = mongoose.model('Employee', employeeSchema);

exports.Employee = Employee;