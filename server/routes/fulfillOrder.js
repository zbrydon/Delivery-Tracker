const express = require('express');
const validate = require('../middlewares/orderUpdateValidator');
const authenticate = require('../middlewares/authenticateTokenWarehouse');
const updateOrderStatus = require('../services/updateOrderStatus');
const fulfillOrder = express.Router();



fulfillOrder.post('/fulfillOrder', authenticate, validate, updateOrderStatus, (req, res) => {
    res.send('This is working!');
});

module.exports = fulfillOrder;  