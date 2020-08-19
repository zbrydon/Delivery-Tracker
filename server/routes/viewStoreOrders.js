const express = require('express');
const authenticate = require('../middlewares/authenticateTokenStore');
const viewOrder = require('../services/viewStoreOrders');
const viewStoreOrders = express.Router();



viewStoreOrders.get('/viewStoreOrders', authenticate, viewOrder , (req, res) => {
    res.send('working');
});

module.exports = viewStoreOrders; 