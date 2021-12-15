const express = require('express');
const {User} = require('../models/users');
const {Admin} = require('../models/admins')
const bcrypt = require('bcrypt');
const _ = require('lodash');
const {sendMail} = require('../config/sendmail');
const {validAdmin}= require('../config/auth')

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
    // sendMail(password, email, rol);
    res.json({msg: `El Usuario ${nombre} ${apellido} se registró exitosamente.`});
});


router.post('/register-admin', async(req, res)=>{
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
    // console.log(admin)
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
        res.status(500).send('Algo salió mal!');
    }
    
    //envio del email con el password
    const rol = "Usuario Administrador"
    sendMail(password, email, rol);
    res.json({msg: `El usuario Admin ${nombre} ${apellido} se registró exitosamente.`});
});


router.post('/login', async(req, res)=>{
    const {email, password} = req.body;
    let auth = false;
    const admin = await Admin.findOne({email});
    if(!admin) return res.status(400).json({auth: auth, msg: 'Usuario no se encuentra registrado.'})
    const validPassword = await bcrypt.compare(password, admin.password);
    if (!validPassword) return res.status(400).json({auth: auth, msg: 'Contraseña incorrecta.'});
    const token = admin.generateAuthToken();
    auth= true;
    return res.status(200).json({auth: auth, token: token, msg: 'Admin logueado!'});
})
module.exports = router;