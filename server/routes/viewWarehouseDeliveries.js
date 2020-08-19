const express = require('express');
const authenticate = require('../middlewares/authenticateTokenWarehouse');
const viewDelivery = require('../services/viewWarehouseDeliveries');
const viewWarehouseDeliveries = express.Router();



viewWarehouseDeliveries.get('/viewWarehouseDeliveries', authenticate, viewDelivery, (req, res) => {
    res.send('working');
});

module.exports = viewWarehouseDeliveries; 