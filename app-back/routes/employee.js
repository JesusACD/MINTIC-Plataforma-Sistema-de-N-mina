const express = require('express');
const bcrypt = require('bcrypt');
const {Employee}= require('../models/employees');
const { validEmployee } = require('../config/auth');

const router = express.Router();

router.post('/login', async (req, res)=>{
    const {email, password} = req.body;
    let auth = false;
    const employee = await Employee.findOne({email});
    if(!employee) return res.status(400).json({auth: auth, msg: 'Empleado no se encuentra registrado.'})
    const validPassword = await bcrypt.compare(password, employee.password);
    if (!validPassword) return res.status(400).json({auth: auth, msg: 'Contraseña incorrecta.'});
    const token = employee.generateAuthToken();
    auth= true;
    return res.status(200).json({auth: auth, token: token, msg: 'Usuario logueado!'});
})

router.put('/update', validEmployee, (req, res)=>{

})

module.exports = router;