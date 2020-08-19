const express = require('express');
const authenticate = require('../middlewares/authenticateTokenWarehouse');
const validate = require('../middlewares/deliveryUpdateValidator');
const updateDeliveryStatus = require('../services/updateDeliveryStatus');
const updateDelivery = express.Router();



updateDelivery.post('/updateDelivery', authenticate, validate , updateDeliveryStatus, (req, res) => {
    res.send('working');
});

module.exports = updateDelivery; 