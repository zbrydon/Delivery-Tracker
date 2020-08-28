const express = require('express');
const validate = require('../middlewares/orderValidator');
const authenticate = require('../middlewares/authenticateTokenStore');
const createOrder = require('../services/createOrder');
const submitOrder = express.Router();



submitOrder.post('/submitOrder', authenticate, validate,  createOrder , (req, res) => {
    return res.status(200).send({
        success: true,
        message: 'Order Created',
        order: res.locals.order
    })
});

module.exports = submitOrder; 