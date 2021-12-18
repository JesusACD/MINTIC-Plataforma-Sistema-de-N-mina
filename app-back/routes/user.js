const express = require('express');
const {User} = require('../models/users');
const {Employee}= require('../models/employees');
const {Permission}= require('../models/permissions');
const {Vacation}= require('../models/vacations');
const bcrypt = require('bcrypt');
const {sendMail} = require('../config/sendmail');
const _ = require('lodash');
const { validNomina, validAdmin } = require('../config/auth');

const router = express.Router();

router.post('/login', async (req, res)=>{
    const {email, password} = req.body;
    let auth = false;
    let user = await User.findOne({email});
    if(!user) return res.status(400).json({auth: auth, msg: 'Usuario no se encuentra registrado.'})
    if(!user.enabled) return res.status(401).json({msg: 'Usuario desactivado, consulte con el administrador del sistema.'})
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) return res.status(400).json({auth: auth, msg: 'Contraseña incorrecta.'});
    const token = user.generateAuthToken();
    auth= true;
    user = await User.findOne({email}).select('-password');
    return res.status(200).json({auth: auth, user: user, token: token, msg: 'Usuario logueado!'});
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
        return res.status(500).json({msg: 'Algo salió mal!'})
    }
    // envio del email con el password
    const rol = "Empleado";
    sendMail(password, email, rol, true);
    return res.status(200).json({msg: `El Empleado ${nombre} ${apellido} se registró exitosamente.`});
    
    //estados: A: activo, I: inactivo, PR: En permiso remunerado, PN: en permiso No Remunerado, V: de vacaciones.
});

router.get('/get-employees', validNomina, async(req, res)=>{
    const employees = await Employee.find({status: {$ne:'I'}}).sort('cedula');
    return res.status(200).json(employees)
})

router.get('/get-employee/:id', validAdmin, async(req, res)=>{
    const id = req.params.id;
    const employee = await Employee.findById(id).select('-password');
    if(!employee) return res.status(404).json({msg: 'Usuario no encontrado!'})
    return res.status(200).json(employee)
})

router.put('/update-employee/:id', validNomina, async(req, res)=>{
    const id = req.params.id;
    let employeeUpdate = {};
    try {
        await Employee.findByIdAndUpdate(id, _.pick(req.body, ['nombre', 'apellido', 'cedula','email', 'telefono', 'cargo', 'salario', 'fecha_contrato'], { new: true }));
        employeeUpdate = await Employee.findById(id).select('-password');
    } catch (error) {
        return res.status(404).json({msg: 'No fue posible ejecutar la actualización. Revise los datos!'});
    }
    if(!employeeUpdate) return res.status(404).json({msg: 'Usuario no encontrado.'})
    return res.status(200).json({Employee: employeeUpdate, msg: 'Información actualizada correctamente'});   
});

router.put('/update/:id', validNomina, async(req, res)=>{
    const id = req.params.id;
    let userUpdate = {};
    try {
        await User.findByIdAndUpdate(id, _.pick(req.body, ['nombre', 'apellido', 'cedula','email', 'telefono'], { new: true }));
        userUpdate = await User.findById(id).select('-password');
    } catch (error) {
        return res.status(404).json({msg: 'No fue posible ejecutar la actualización. Revise los datos!'});
    }
    if(!userUpdate) return res.status(404).json({msg: 'Usuario no encontrado.'})
    return res.status(200).json({user: userUpdate, msg: 'Información actualizada correctamente'});   

})


//borrado lógico
router.put('/delete-employee/:id', validNomina, async(req, res)=>{
    const id = req.params.id;
    try {
        await Employee.findByIdAndUpdate(id, {status: 'I'}, { new: true });  
    } catch (error) {
        return res.status(404).json({msg: 'No fue posible ejecutar la operación. Revise los datos!'});
    }
    return res.status(200).json({msg: 'Usuario dehabilitado correctamente.'});
})

router.put('/change-password/:id', validNomina, async(req, res)=>{
    const id = req.params.id;
    const {password, newpassword}= req.body;
    const user = await User.findById(id);
    if(!user) return res.status(400).json({msg: 'Usuario no encontrado.'})
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) return res.status(400).json({msg: 'Contraseña incorrecta.'});
    const salt = await bcrypt.genSalt(10);
    const passwordhash = await bcrypt.hash(newpassword, salt);
    await User.findByIdAndUpdate(id, {password: passwordhash}, {new: true});
    return res.status(200).json({msg: 'Contraseña actualizada correctamente'});   
});

module.exports = router;