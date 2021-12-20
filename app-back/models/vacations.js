const mongoose = require('mongoose');


const vacationSchema = new mongoose.Schema({
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
        maxlength: 50
    },
    fecha_inicio: {
        type: String,
        required: true,
        minlength: 4,
        maxlength: 20
    },
    fecha_fin: {
        type: String,
        required: true,
        minlength: 4,
        maxlength: 20
    },
    aprobado: {
        type: Boolean,
        default: false
    },
    aprobado_por: {
        type: String,
        maxlength: 20,
        default: ""
    }
},
    {
        timestamps: true
    }
)

const Vacation = mongoose.model('Vacation', vacationSchema);

exports.Vacation = Vacation;