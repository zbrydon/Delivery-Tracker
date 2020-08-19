const express = require('express');
const mqtt = require('mqtt');
const authenticate = require('../middlewares/authenticateTokenWarehouse');
const validate = require('../middlewares/deliveryUpdateValidator');
const updateDeliveryStatus = require('../services/updateDeliveryStatus');
const transitMqttInit = require('../middlewares/transitMqttInit');
const updateDelivery = express.Router();



updateDelivery.post('/updateDelivery', authenticate, validate, updateDeliveryStatus, transitMqttInit ,(req, res) => {
    res.send(res.data);
});

module.exports = updateDelivery; 