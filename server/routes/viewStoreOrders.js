const express = require('express');
const authenticate = require('../middlewares/authenticateTokenStore');
const viewOrder = require('../services/viewStoreOrders');
const viewStoreOrders = express.Router();



viewStoreOrders.get('/viewStoreOrders', authenticate, viewOrder , (req, res) => {
    return res.status(200).send({
        success: true,
        message: 'Orders Displayed',
        orders: res.locals.orders
    })
});

module.exports = viewStoreOrders; 