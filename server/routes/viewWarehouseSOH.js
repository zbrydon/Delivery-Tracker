const express = require('express');
const authenticate = require('../middlewares/authenticateTokenWarehouse');
const viewSOH = require('../services/viewWarehouseSOH');
const viewWarehouseSOH = express.Router();

viewWarehouseSOH.get('/viewWarehouseSOH', authenticate, viewSOH, (req, res) => {
    return res.status(200).send({
        success: true,
        message: 'SOH Displayed',
        SOH: res.locals.SOH
    })
});

module.exports = viewWarehouseSOH; 