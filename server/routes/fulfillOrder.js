const express = require('express');
const validate = require('../middlewares/orderUpdateValidator');
const authenticate = require('../middlewares/authenticateTokenWarehouse');
const updateOrderStatus = require('../services/updateOrderStatus');
const transmit = require('../middlewares/transitMqttInit');
const Order = require('../models/Order');
const fulfillOrder = express.Router();



fulfillOrder.post('/fulfillOrder', authenticate, validate, updateOrderStatus, /*transmit ,*/ (req, res) => {
    return res.status(200).send({
        success: true,
        message: 'Updated Order',
        order: res.locals.order
    })
});

module.exports = fulfillOrder;  