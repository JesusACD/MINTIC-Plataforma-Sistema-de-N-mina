const express = require('express');
const bcrypt = require('bcrypt');
const {Employee}= require('../models/employees');
const { validEmployee } = require('../config/auth');
const _ = require('lodash');
const jwt = require('jsonwebtoken');
const { jwtKey } = require('../config/keys');
const { Vacation } = require('../models/vacations');
const { Permission } = require('../models/permissions');
const { genpdf, pagopdf } = require('../utils/pdf');
const path = require('path');
const { Payment } = require('../models/payments');

const router = express.Router();

router.post('/login', async (req, res)=>{
    const {email, password} = req.body;
    let auth = false;
    let employee = await Employee.findOne({email});
    if(!employee) return res.status(400).json({auth: auth, msg: 'Empleado no se encuentra registrado.'})
    if(employee.status === "I") return res.status(401).json({msg: 'Usuario desactivado, consulte con el administrador del sistema.'})
    const validPassword = await bcrypt.compare(password, employee.password);
    if (!validPassword) return res.status(400).json({auth: auth, msg: 'Contraseña incorrecta.'});
    const token = employee.generateAuthToken();
    auth= true;
    employee = await Employee.findOne({email}).select('-password');
    return res.status(200).json({auth: auth, user: employee,  token: token, msg: 'Usuario logueado!'});
})

router.put('/update/:id', validEmployee, async(req, res)=>{
    const id = req.params.id;
    let employeeUpdate = {};
    try {
        await Employee.findByIdAndUpdate(id, _.pick(req.body, ['nombre', 'apellido', 'cedula','email', 'telefono'], { new: true }));
        employeeUpdate = await Employee.findById(id).select('-password');
    } catch (error) {
        return res.status(404).json({msg: 'No fue posible ejecutar la actualización. Revise los datos!'});
    }
    if(!employeeUpdate) return res.status(404).json({msg: 'Usuario no encontrado.'})
    return res.status(200).json({user: employeeUpdate, msg: 'Información actualizada correctamente.'});   

})

router.put('/change-password/:id', validEmployee, async(req, res)=>{
    const id = req.params.id;
    const {password, newpassword}= req.body;
    const employee = await Employee.findById(id);
    if(!employee) return res.status(400).json({msg: 'Usuario no encontrado.'})
    const validPassword = await bcrypt.compare(password, employee.password);
    if (!validPassword) return res.status(400).json({msg: 'Contraseña incorrecta.'});
    const salt = await bcrypt.genSalt(10);
    const passwordhash = await bcrypt.hash(newpassword, salt);
    await Employee.findByIdAndUpdate(id, {password: passwordhash}, {new: true});
    return res.status(200).json({msg: 'Contraseña actualizada correctamente'});   
});

//solicitar vacaciones.
router.post('/vacation', validEmployee, async(req, res)=>{
    const {fecha_inicio, fecha_fin}= req.body;
    if(!fecha_inicio || !fecha_fin) return res.status(400).json({msg: 'Debe enviar todos los datos requeridos.'})
    const token = req.header('access-token')
    const decoded = jwt.verify(token, jwtKey.jwtPrivateKey);
    const id = decoded._id;
    const employee = await Employee.findById(id).select('-password');
    const {nombre, apellido, cedula, cargo}= employee;
    const vacation = new Vacation({nombre, apellido, cedula, cargo, fecha_inicio, fecha_fin});
    try {
        await vacation.save()
        .then((data)=>{
            console.log('Datos guardados.')
        })
    } catch (error) {
        return res.status(500).json({msg: 'Algo salió mal!'})
    }
    return res.status(200).json({msg:'Se registró exitosamente la solicitud.'})
})


//solicitar permisos.
router.post('/permission', validEmployee, async(req, res)=>{
    const {fecha_inicio, fecha_fin}= req.body;
    if(!fecha_inicio || !fecha_fin) return res.status(400).json({msg: 'Debe enviar todos los datos requeridos.'})
    const token = req.header('access-token')
    const decoded = jwt.verify(token, jwtKey.jwtPrivateKey);
    const id = decoded._id;
    const employee = await Employee.findById(id).select('-password');
    const {nombre, apellido, cedula, cargo}= employee;
    console.log(nombre, apellido, cedula, cargo, fecha_inicio, fecha_fin)
    const permission = new Permission({nombre, apellido, cedula, cargo, fecha_inicio, fecha_fin});
    try {
        await permission.save()
        .then((data)=>{
            console.log('Datos guardados.')
        })
    } catch (error) {
        return res.status(500).json({msg: 'Algo salió mal!', error: error})
    }
    return res.status(200).json({msg:'Se registró exitosamente la solicitud.'})
})

router.get('/get-cert/:id', async(req, res)=>{
    const id = req.params.id;
    let employee = {};
    try {
        employee =  await Employee.findById(id);
        const {nombre, apellido, cedula, cargo, salario, fecha_contrato} = employee
        const fecha = new Date()
        const day = fecha.getUTCDate();
        const mes = fecha.toLocaleString('default', { month: 'long' });
        const year = fecha.getFullYear();
        const fecha_string = `${mes} ${day}/${year}`
        const salariof= salario.toLocaleString('en-US', {currency: 'COP'})
        await genpdf(nombre, apellido, cedula, cargo, salariof, fecha_string, fecha_contrato);
        setTimeout(()=>{
            return res.download(path.join(__dirname, '..', `/utils/${cedula}.pdf`))
        },3000)
    } catch (error) {
        return res.status(400).json({msg: 'Error en los datos enviados!'})
    }
})

router.get('/report_payment/:id', async(req, res)=>{
    const id = req.params.id;
    let employee = {};
    try {
        employee =  await Employee.findById(id);
    } catch (error) {
        return res.status(400).json({msg: 'Error en el id enviado!'})
    }
    try {
        let {nombre, apellido, cedula, cargo, salario} = employee
        const payment = await Payment.findOne({cedula})
        let {mes_pago, fecha_pago, pagos_extras_mes, permisos_NR_mes, descuentos_ley, total_pago}= payment;
        const fecha = new Date(fecha_pago);
        const ano = fecha.getFullYear();
        const mes_num = fecha.getMonth() + 1
        salario= salario.toLocaleString('en-US', {currency: 'COP'});
        pagos_extras_mes= pagos_extras_mes.toLocaleString('en-US', {currency: 'COP'});
        permisos_NR_mes= permisos_NR_mes.toLocaleString('en-US', {currency: 'COP'}); 
        descuentos_ley= descuentos_ley.toLocaleString('en-US', {currency: 'COP'}); 
        total_pago= total_pago.toLocaleString('en-US', {currency: 'COP'}); 
        await pagopdf(mes_pago, mes_num, ano, nombre, apellido, cedula, cargo, salario, pagos_extras_mes, descuentos_ley, permisos_NR_mes,total_pago);
        setTimeout(()=>{
            return res.download(path.join(__dirname, '..', `/utils/${cedula}-${mes_num}-${ano}.pdf`))
        },3000)
    } catch (error) {
        return res.status(400).json({msg: 'Error en los datos enviados!'})
    }
})

module.exports = router;