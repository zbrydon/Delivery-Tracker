const express = require('express');
const validate = require('../middlewares/addSOHValidator');
const authenticateStore = require('../middlewares/authenticateTokenStore');
const authenticateWarehouse = require('../middlewares/authenticateTokenWarehouse');
const addSOHH = require('../services/addSOH');

const addSOH = express.Router();

addSOH.post('/addSOH', authenticateStore, authenticateWarehouse, validate, addSOHH ,(req, res) => {
    if (res.locals.store) {
        return res.status(200).send({
            success: true,
            message: 'SOH Updated',
            store: res.locals.store
        })
    } if (res.locals.warehouse) {
        return res.status(200).send({
            success: true,
            message: 'SOH Updated',
            warehouse: res.locals.warehouse
        })
    }
    
});


module.exports = addSOH; 