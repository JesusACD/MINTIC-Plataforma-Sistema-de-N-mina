const jwt = require('jsonwebtoken');
const jwtKey = require('../config/keys').jwtKey;

module.exports = {
    validAdmin: function (req, res, next){
        const token = req.header('access-token');
        if (!token) return res.status(401).json({msg: 'Acceso no permitido, no se encontró token.'});
        try {
            const decoded = jwt.verify(token, jwtKey.jwtPrivateKey);
            if(!decoded.isAdmin) return res.status(401).json({msg: 'Usted no posee permisos para esta solicitud.'})
            next();
        }
        catch (ex) {
            res.status(400).json({msg: 'Token Inválido.'});
        }
    },

    validNomina: function (req, res, next){
        const token = req.header('access-token');
        if (!token) return res.status(401).json({msg: 'Acceso no permitido, no se encontró token.'});
        try {
            const decoded = jwt.verify(token, jwtKey.jwtPrivateKey);
            if(decoded.isAdmin  || decoded.enabled) return next();
            return res.status(401).json({msg: 'Usted no posee permisos para esta solicitud.'});
        }
        catch (ex) {
            res.status(400).json({msg: 'Token Inválido.'});
        }
    },

    validEmployee: function (req, res, next){
        const token = req.header('access-token');
        if (!token) return res.status(401).json({msg: 'Acceso no permitido, no se encontró token.'});
        try {
            const decoded = jwt.verify(token, jwtKey.jwtPrivateKey);
            if(decoded.status  === "I") return res.status(401).json({msg: 'Usted no posee permisos para esta solicitud.'});
            next();
        }
        catch (ex) {
            res.status(400).json({msg: 'Token Inválido.'});
        }
    }


}