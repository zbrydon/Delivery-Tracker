const express = require('express');
const validate = require('../middlewares/updateSOHValidator');
const authenticateWarehouse = require('../middlewares/authenticateTokenWarehouse');
const updateWarehouseSOHH = require('../services/updateWarehouseSOH');

const updateWarehouseSOH = express.Router();

updateWarehouseSOH.post('/updateWarehouseSOH', authenticateWarehouse, validate, updateWarehouseSOHH ,(req, res) => {
    return res.status(200).send({
        success: true,
        message: 'SOH Updated',
        warehouse: res.locals.warehouse
    })
    
});


module.exports = updateWarehouseSOH; 