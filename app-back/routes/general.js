const express = require('express');
const jwt = require('jsonwebtoken');
const jwtKey = require('../config/keys').jwtKey
const {sendLinkForgot, sendMail} = require('../config/sendmail');
const {User}= require('../models/users')
const {Employee}= require('../models/employees');
const bcrypt = require('bcrypt');

router = express.Router();

router.post('/forgot-password/', async(req, res)=>{
    const {email, rol}= req.body;
    const token= jwt.sign({_email: email, _rol: rol}, jwtKey.jwtPrivateKey, {expiresIn: '5m'});
    sendLinkForgot(email, token);
    return res.status(200).json({msg: 'Se envió link de recuperación al correo suministrado, el link expira en 5 minutos.'})
});

router.get('/reset-password/:token', async(req, res)=>{
    const token = req.params.token;
    try {
        const decoded = jwt.verify(token, jwtKey.jwtPrivateKey);
        const email = decoded._email;
        const rol = decoded._rol
        let user="";
        const randomstring = Math.random().toString(36).slice(-6);
        const password = randomstring.toUpperCase();
        const salt = await bcrypt.genSalt(10);
        const password_hash = await bcrypt.hash(password, salt);
        try {
            if(rol === 'Empleado'){
                user = await Employee.findOne({email});
                await Employee.findByIdAndUpdate(user._id,{password: password_hash}, {new: true})
            }
            if(rol === 'Nomina'){
                user = await User.findOne({email});
                await User.findByIdAndUpdate(user._id,{password: password_hash}, {new: true})
            }
        } catch (error) {
            return res.status(404).json({msg: 'No se pudo completar la solicitud!'})
        }
        sendMail(password, email, rol, false);
        return res.status(200).send(`INFO: Se ha enviado correctamente la nueva contraseña a ${email}.`)
            
    } catch (error) {
        return res.status(401).send('Solicitud fallida, token expiró. Repita nuevamente el proceso o contacte a un administrador.')
    }

})


module.exports = router;