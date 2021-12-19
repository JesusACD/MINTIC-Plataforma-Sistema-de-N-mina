const mongoose = require('mongoose');


const paymentSchema = new mongoose.Schema({
    fecha_pago: {
        type: String,
        required: true
    },
    mes_pago: {
        type: String,
        required: true
    },
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
    salario: {
        type: Number,
        required: true,
        maxlength: 30
    },
    pagos_extras_mes: {
        type: Number,
        required: true,
        maxlength: 20
    },
    descuentos_ley: {
        type: Number,
        default: this.salario * 0.08,
        required: true,
        maxlength: 20
    },
    permisos_NR_mes: {
        type: Number,
        maxlength: 4,
        default: 0
    },
    total_pago: {
        type: Number,
        maxlength: 20
    },
},
    {
        timestamps: true
    }
)

const Payment = mongoose.model('Payment', paymentSchema);

exports.Payment = Payment;