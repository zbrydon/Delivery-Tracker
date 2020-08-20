const express = require('express');
const validate = require('../middlewares/orderUpdateValidator');
const authenticate = require('../middlewares/authenticateTokenWarehouse');
const updateOrderStatus = require('../services/updateOrderStatus');
const transmit = require('../middlewares/transitMqttInit');
const fulfillOrder = express.Router();



fulfillOrder.post('/fulfillOrder', authenticate, validate, updateOrderStatus, transmit , (req, res) => {
    console.log('working');
});

module.exports = fulfillOrder;  