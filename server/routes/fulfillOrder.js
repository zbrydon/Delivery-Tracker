const express = require('express');
const validate = require('../middlewares/deliveryValidator');
const authenticate = require('../middlewares/authenticateToken');
const createDelivery = require('../services/createDelivery');
const fulfillOrder = express.Router();



fulfillOrder.post('/fulfillOrder', authenticate, validate, createDelivery, (req, res) => {
    res.send('This is working!');
});

module.exports = fulfillOrder; 