const express = require('express');
const validate = require('../middlewares/orderValidator');
const authenticate = require('../middlewares/authenticateToken');
const createOrder = require('../services/createOrder');
const submitOrder = express.Router();



submitOrder.post('/submitOrder', authenticate, validate,  createOrder , (req, res) => {
    res.send('This is working!');
});

module.exports = submitOrder; 