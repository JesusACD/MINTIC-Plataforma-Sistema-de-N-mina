const jwt = require('jsonwebtoken');
const jwtKey = require('../config/keys').jwtKey;

module.exports = {
    validAdmin: function (req, res, next){
        const token = req.header('access-token');
        if (!token) return res.status(401).send('Acceso no permitido, no se encontró token.');
        try {
            const decoded = jwt.verify(token, jwtKey.jwtPrivateKey);
            if(!decoded.isAdmin || decoded.isAdmin === false) return res.status(401).send('Usted no posee permisos para esta solicitud.')
            next();
        }
        catch (ex) {
            res.status(400).send('Token Inválido.');
        }
    },

    validNomina: function (req, res, next){
        const token = req.header('access-token');
        if (!token) return res.status(401).send('Acceso no permitido, no se encontró token.');
        try {
            const decoded = jwt.verify(token, jwtKey.jwtPrivateKey);
            if(!decoded.isAdmin || decoded.isAdmin === false || !decoded.enabled || decoded.enabled === false) return res.status(401).send('Usted no posee permisos para esta solicitud.')
            next();
        }
        catch (ex) {
            res.status(400).send('Token Inválido.');
        }
    },

    validEmployee: function (req, res, next){
        const token = req.header('access-token');
        if (!token) return res.status(401).send('Acceso no permitido, no se encontró token.');
        try {
            const decoded = jwt.verify(token, jwtKey.jwtPrivateKey);
            if(!decoded.status || decoded.status  === "I") return res.status(401).send('Usted no posee permisos para esta solicitud.')
            next();
        }
        catch (ex) {
            res.status(400).send('Token Inválido.');
        }
    }


}