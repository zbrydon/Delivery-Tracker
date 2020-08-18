const express = require('express');
const validate = require('../middlewares/deliveryValidator');
const authenticate = require('../middlewares/authenticateToken');
const createDelivery = require('../services/createDelivery');
const deleteOrder = require('../services/deleteOrder');
const fulfillOrder = express.Router();



fulfillOrder.post('/fulfillOrder', authenticate, validate, createDelivery, deleteOrder , (req, res) => {
    res.send('This is working!');
});

module.exports = fulfillOrder; 