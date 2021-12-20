const express = require('express');

const router = express.Router();

router.get('/', (req, res)=>{
    res.status(200).send('Página inicial Backend App Nómina...')
})

module.exports = router;