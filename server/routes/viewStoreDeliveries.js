const express = require('express');
const authenticate = require('../middlewares/authenticateTokenStore');
const viewDelivery = require('../services/viewStoreDeliveries');
const viewStoreDeliveries = express.Router();



viewStoreDeliveries.get('/viewStoreDeliveries', authenticate, viewDelivery, (req, res) => {
    res.send('working');
});

module.exports = viewStoreDeliveries; 