const express = require('express');
const {User} = require('../models/users');
const {Employee}= require('../models/employees');
const {Permission}= require('../models/permissions');
const {Vacation}= require('../models/vacations');
const bcrypt = require('bcrypt');
const {sendMail} = require('../config/sendmail');
const _ = require('lodash');
const { validNomina, validAdmin } = require('../config/auth');
const { Payments } = require('../models/payments');

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
    req.body.email= email.toLowerCase();
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
    const employees = await Employee.find({enabled: {$ne:false}}).sort('cedula');
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
        await Employee.findByIdAndUpdate(id, _.pick(req.body, ['nombre', 'apellido', 'cedula','email', 'telefono', 'cargo', 'salario', 'fecha_contrato', 'pagos_extras_mes'], { new: true }));
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
        await Employee.findByIdAndUpdate(id, {enabled: false, status: "I"}, { new: true });  
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


//listar vacaciones
router.get('/get-vacations', validNomina, async(req, res)=>{
    const vacations = await Vacation.find({aprobado: {$eq:false}});
    res.status(200).json({vacaciones: vacations})
})

//listar permisos
router.get('/get-permissions', validNomina, async(req, res)=>{
    const permissions = await Permission.find({aprobado: {$eq:false}});
    res.status(200).json({permisos: permissions})
})

//pagar nómina
router.get('/payments', validNomina, async(req, res)=>{
    const employees = await Employee.find({status: {$ne:'I'}}).sort('cedula');
    len = employees.length;
    const today = new Date("11-30-2021");
    // const today = new Date();
    const fecha_pago = today.toLocaleDateString("en-US");
    const mes_pago= today.toLocaleString('default', { month: 'long' });
    employees.forEach(async (employee)=>{
        let {nombre, apellido, cedula, cargo, salario, pagos_extras_mes, pnr_mes } = employee;
        const payment = new Payments({fecha_pago, mes_pago, nombre, apellido, cedula, cargo, salario, pagos_extras_mes})
        const _descuentos_ley=  salario * 0.08;
        payment.descuentos_ley = _descuentos_ley.toFixed(2);
        const _permisos_NR_mes = pnr_mes * salario / 30;
        payment.permisos_NR_mes = _permisos_NR_mes.toFixed(2);
        const _total_pago = salario.toFixed(2) + pagos_extras_mes - payment.descuentos_ley - payment.permisos_NR_mes;
        payment.total_pago = _total_pago.toFixed(2);
        await payment.save()
        .then((data)=>{console.log('Payment ok!')})
        .catch(err => (`No se pudo realizar el pago del usuario ${nombre} ${apellido}`))
        const _employee = await Employee.findOneAndUpdate({cedula}, {pnr_mes: 0, pagos_extras_mes: 0 })

    })
    return res.status(200).json({msg: 'Se ejecutó la operación correctamente.'})
})


router.get('/approve-vacation/:id', async(req, res)=>{
    const id = req.params.id
    try {
        const vacation = await Vacation.findByIdAndUpdate(id, {aprobado: true, aprobado_por: 'User Nomina'});
        const employee = await Employee.findOneAndUpdate({cedula: vacation.cedula}, {vacations: true});
        return res.status(200).json({msg: 'Se realizó la solicitud correectamente.'})
    } catch (error) {
        return res.status(400).json({msg:'Error en los datos enviados.'})
    }
})

router.get('/approve-permission/:id', async(req, res)=>{
    const id = req.params.id
    try {
        const permission = await Permission.findByIdAndUpdate(id, {aprobado: true, aprobado_por: 'User Nomina'});
        const employee = await Employee.findOne({cedula: permission.cedula});
        await Employee.findOneAndUpdate({cedula: permission.cedula}, {permissions_nrem: employee.permissions_nrem + 1, pnr_mes: employee.pnr_mes + 1});
        return res.status(200).json({msg: 'Se realizó la solicitud correctamente.'})
    } catch (error) {
        return res.status(400).json({msg:'Error en los datos enviados.'})
    }
})
module.exports = router;