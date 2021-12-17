const nodemailer = require('nodemailer');
const pass = require('../config/keys').gmail

function sendLinkForgot(to, token){
    // Definimos el transporter
    var transporter = nodemailer.createTransport({
        service: 'Gmail',
        port:465,
        secure:true,
        auth: {
            user: 'appnomina.carulla@gmail.com',
            pass: pass.pass
        }
    });

    // Definimos el email
    const mailOptions = {
        from: 'appnomina.carulla@gmail.com',
        to: to,
        subject: 'Link recuperación de contraseña',
        html: `<p>Recupere su contraseña: <a href=http://localhost:3001/general/reset-password/${token}>Click aquí</a></p>`
    };


   
    // Enviamos el email
    transporter.sendMail(mailOptions, function(error, info){
        if (error){
            console.log(error);
        } else {
            console.log("Email sent");
        }
    })
};


function sendMail(password, to, rol, first_time){
    // Definimos el transporter
    var transporter = nodemailer.createTransport({
        service: 'Gmail',
        port:465,
        secure:true,
        auth: {
            user: 'appnomina.carulla@gmail.com',
            pass: pass.pass
        }
    });

    let mailOptions = {};
    // Definimos el email
    if(first_time === true){
        mailOptions = {
            from: 'appnomina.carulla@gmail.com',
            to: to,
            subject: 'Password App Nomina',
            html: `<p>Su contraseña de ${rol} es <strong>${password}</strong>, puede cambiarla una vez inicie sesión.</p>`
        };
    }

    if(first_time === false){
        mailOptions = {
            from: 'appnomina.carulla@gmail.com',
            to: to,
            subject: 'Cambio de Password App Nomina',
            html: `<p>Su nueva contraseña de ${rol} es <strong>${password}</strong></p>`
        };
    }
    
    // Enviamos el email
    transporter.sendMail(mailOptions, function(error, info){
        if (error){
            console.log(error);
        } else {
            console.log("Email sent");
        }
    })
};
    

exports.sendMail = sendMail;
exports.sendLinkForgot= sendLinkForgot;