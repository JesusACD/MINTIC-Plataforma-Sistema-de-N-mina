const express = require('express');
const {User} = require('../models/users');
const {Admin} = require('../models/admins')
const bcrypt = require('bcrypt');
const _ = require('lodash');
const {sendMail} = require('../config/sendmail');
const {validAdmin}= require('../config/auth');
const { Employee } = require('../models/employees');

const router = express.Router();

router.post('/register-user', validAdmin, async(req, res)=>{
    const {nombre, apellido, cedula, email, telefono } = req.body;
    const enabled = true;
    
    if (!nombre|| !apellido || !cedula || !email || !telefono){
        return res.status(400).json({msg: 'Debe enviar todos los datos solicitados.'})
    }
    let user = await User.findOne({ email: email });
    if (user) return res.status(400).json({msg: 'Usuario ya se encuentra registrado.'});

    const randomstring = Math.random().toString(36).slice(-6);
    const password = randomstring.toUpperCase();
    user = new User(_.pick(req.body, ['nombre', 'apellido', 'cedula','email', 'telefono'], password, enabled));    
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
    user.enabled= enabled;
    try {
        await user.save()
        .then((data)=>{
            console.log('Datos guardados.')
        })
    } catch (error) {
        console.log(error);
        res.status(500).send('Algo salió mal!')
    }
   //envio del email con el password
    const rol = "Usuario Nómina"
    sendMail(password, email, rol, true);
    return res.status(200).json({msg: `El Usuario ${nombre} ${apellido} se registró exitosamente.`});
});


router.post('/register-admin',validAdmin, async(req, res)=>{
    const {nombre, apellido, email, telefono} = req.body;
    if (!nombre|| !apellido || !email || !telefono){
        return res.status(400).json({msg: 'Debe enviar todos los datos solicitados.'})
    }
    let admin = await Admin.findOne({ email: email });
    if (admin) return res.status(400).json({msg: 'Admin ya se encuentra registrado.'});

    const randomstring = Math.random().toString(36).slice(-6);
    const password = randomstring.toUpperCase();
    const isAdmin = true;
    admin = new Admin(_.pick(req.body, ['nombre', 'apellido','email', 'telefono'], password, isAdmin));
    const salt = await bcrypt.genSalt(10);
    admin.password = await bcrypt.hash(password, salt);
    admin.isAsdmin= true;
    try {
        await admin.save()
        .then((data)=>{
            console.log('Datos guardados.')
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({msg:'Algo salió mal!'});
    }
    
    //envio del email con el password
    const rol = "Usuario Administrador"
    sendMail(password, email, rol, true);
    return res.status(200).json({msg: `El usuario Admin ${nombre} ${apellido} se registró exitosamente.`});
});


router.post('/login', async(req, res)=>{
    const {email, password} = req.body;
    let auth = false;
    let admin = await Admin.findOne({email})
    console.log(admin)
    if(!admin) return res.status(400).json({auth: auth, msg: 'Usuario no se encuentra registrado.'})
    if(!admin.isAdmin) return res.status(400).json({msg: 'Usuario fue desactivado, consulte con el adminstrador de sistema.'})
    const validPassword = await bcrypt.compare(password, admin.password);
    if (!validPassword) return res.status(400).json({auth: auth, msg: 'Contraseña incorrecta.'});
    const token = admin.generateAuthToken();
    auth= true;
    admin = await Admin.findOne({email}).select('-password');
    return res.status(200).json({auth: auth, token: token, msg: 'Admin logueado!'});
});

router.put('/update-user/:id', validAdmin, async(req, res)=>{
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

router.get('/get-users', validAdmin, async(req, res)=>{
    const users = await User.find({enabled: true}).sort('cedula').select('-password');
    return res.status(200).json(users)
})

router.get('/get-user/:id', validAdmin, async(req, res)=>{
    const id = req.params.id;
    const user = await User.findById(id).select('-password');
    if(!user) return res.status(404).json({msg: 'Usuario no encontrado!'})
    return res.status(200).json(user)
})


//borrado lógico
router.put('/delete-user/:id', validAdmin, async(req, res)=>{
    const id = req.params.id;
    try {
        await User.findByIdAndUpdate(id, {enabled: false}, { new: true });  
    } catch (error) {
        return res.status(404).json({msg: 'No fue posible ejecutar la operación. Revise los datos!'});
    }
    return res.status(200).json({msg: 'Usuario dehabilitado correctamente.'});
})

router.post('/resend-password', validAdmin, async(req, res)=>{
    const {email, rol}= req.body
    let user="";
    const randomstring = Math.random().toString(36).slice(-6);
    const password = randomstring.toUpperCase();
    const salt = await bcrypt.genSalt(10);
    const password_hash = await bcrypt.hash(password, salt);
    try {
        if(rol === 'empleado'){
            user = await Employee.findOne({email});
            await Employee.findByIdAndUpdate(user._id,{password: password_hash}, {new: true})
        }
        if(rol === 'nomina'){
            user = await User.findOne({email});
            await User.findByIdAndUpdate(user._id,{password: password_hash}, {new: true})
        }
    } catch (error) {
        return res.status(404).json({msg: 'No se pudo completar la solicitud!'})
    }
    sendMail(password, email, rol, false);
    return res.status(200).json({msg: 'Se ha enviado correctamente la nueva contraseña.'})

})

module.exports = router;