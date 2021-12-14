const express = require('express');
const {User} = require('../models/users');
const {Employee}= require('../models/employees');
const bcrypt = require('bcrypt');
const {sendMail} = require('../config/sendmail');
const _ = require('lodash');
const { validNomina } = require('../config/auth');

const router = express.Router();

router.post('/login', async (req, res)=>{
    const {email, password} = req.body;
    let auth = false;
    const user = await User.findOne({email});
    if(!user) return res.status(400).json({auth: auth, msg: 'Usuario no se encuentra registrado.'})
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) return res.status(400).json({auth: auth, msg: 'Contraseña incorrecta.'});
    const token = user.generateAuthToken();
    auth= true;
    return res.status(200).json({auth: auth, token: token, msg: 'Usuario logueado!'});
})

router.post('/register-employee', validNomina, async(req, res)=>{
    const {nombre, apellido, cedula, email, telefono, cargo, salario, fecha_contrato} = req.body;
    
    if (!nombre || !apellido || !cedula || !email || !telefono || !cargo || !salario || !fecha_contrato){
        return res.status(400).json({msg: 'Debe enviar todos los datos solicitados.'})
    }
    let employee = await Employee.findOne({ email: email });
    if (employee) return res.status(400).json({msg: 'Empleado ya se encuentra registrado.'});

    const randomstring = Math.random().toString(36).slice(-6);
    const password = randomstring.toUpperCase();
    const status = "A";
    const vacations = false;
    const permissions = 0;
    employee = new Employee(_.pick(req.body, ['nombre', 'apellido', 'cedula','email', 'telefono', 'cargo', 'salario', 'fecha_contrato'], password, status, vacations, permissions));
    const salt = await bcrypt.genSalt(10);
    employee.password = await bcrypt.hash(password, salt);
    employee.status= "A";
    try {
        await employee.save()
        .then((data)=>{
            console.log('Datos guardados.')
        })
    } catch (error) {
        console.log(error);
        res.status(500).send('Algo salió mal!')
    }
    // envio del email con el password
    const rol = "Empleado";
    sendMail(password, email, rol);
    res.json({msg: `El Empleado ${nombre} ${apellido} se registró exitosamente.`});
    
    //estados: A: activo, I: inactivo, PR: En permiso remunerado, PN: en permiso No Remunerado, V: de vacaciones.
});

module.exports = router;