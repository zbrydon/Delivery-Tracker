const express = require('express');
const authenticate = require('../middlewares/authenticateTokenWarehouse');
const viewOrder = require('../services/viewWarehouseOrders');
const viewWarehouseOrders = express.Router();



viewWarehouseOrders.get('/viewWarehouseOrders', authenticate, viewOrder, (req, res) => {
    return res.status(200).send({
        success: true,
        message: 'Orders Displayed',
        orders: res.locals.orders
    })
});

module.exports = viewWarehouseOrders; 