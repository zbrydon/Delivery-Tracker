const express = require('express');
const validate = require('../middlewares/updateSOHValidator');
const authenticateStore = require('../middlewares/authenticateTokenStore');
const updateStoreSOHH = require('../services/updateStoreSOH');

const updateStoreSOH = express.Router();

updateStoreSOH.post('/updateStoreSOH', authenticateStore, validate, updateStoreSOHH ,(req, res) => {
    return res.status(200).send({
        success: true,
        message: 'SOH Updated',
        store: res.locals.store
    })
    
});


module.exports = updateStoreSOH; 