const express = require('express');
const bcrypt = require('bcrypt');
const {Employee}= require('../models/employees');
const { validEmployee } = require('../config/auth');
const _ = require('lodash');

const router = express.Router();

router.post('/login', async (req, res)=>{
    const {email, password} = req.body;
    let auth = false;
    const employee = await Employee.findOne({email});
    if(!employee) return res.status(400).json({auth: auth, msg: 'Empleado no se encuentra registrado.'})
    if(employee.status === "I") return res.status(401).json({msg: 'Usuario desactivado, consulte con el administrador del sistema.'})
    const validPassword = await bcrypt.compare(password, employee.password);
    if (!validPassword) return res.status(400).json({auth: auth, msg: 'Contraseña incorrecta.'});
    const token = employee.generateAuthToken();
    auth= true;
    return res.status(200).json({auth: auth, token: token, msg: 'Usuario logueado!'});
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
    return res.status(200).json({user: employeeUpdate, msg: 'Información actualizada correctamente'});   

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


module.exports = router;