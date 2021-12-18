const mongoose = require('mongoose');


const permissionSchema = new mongoose.Schema({
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
        maxlength: 20
    },
    cargo: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50,
        unique: true
    },
    fecha_inicio: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 20
    },
    fecha_fin: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 20
    },
    aprobado: {
        type: Boolean
    },
    remunerado: {
        type: Boolean
    },
    aprobado_por: {
        type: String,
        maxlength: 20
    }
},
    {
        timestamps: true
    }
)

const Permission = mongoose.model('Permission', permissionSchema);

exports.Permission = Permission;