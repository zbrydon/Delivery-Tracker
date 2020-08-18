const express = require('express');
const validate = require('../middlewares/loginValidator');
const authenticate = require('../middlewares/authenticateWarehouse');
const loginWarehouse = express.Router();



loginWarehouse.post('/loginWarehouse', validate, authenticate, (req, res) => {
    res.send('This is working!');
});

module.exports = loginWarehouse; 