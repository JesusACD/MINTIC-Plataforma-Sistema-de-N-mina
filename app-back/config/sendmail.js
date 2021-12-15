const nodemailer = require('nodemailer');
const pass = require('../config/keys').gmail

function sendMail(randomstring, to, rol){
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
    var mailOptions = {
        from: 'appnomina.carulla@gmail.com',
        to: to,
        subject: 'Password App Nomina',
        html: `<p>Su contraseña de ${rol} es <strong>${randomstring}</strong>, puede cambiarla una vez inicie sesión.</p>`
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

exports.sendMail = sendMail;