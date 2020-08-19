const express = require('express');
const authenticate = require('../middlewares/authenticateTokenWarehouse');
const viewOrder = require('../services/viewWarehouseOrders');
const viewWarehouseOrders = express.Router();



viewWarehouseOrders.get('/viewWarehouseOrders', authenticate, viewOrder, (req, res) => {
    res.send('working');
});

module.exports = viewWarehouseOrders; 