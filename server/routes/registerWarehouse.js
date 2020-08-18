const express = require('express');
const validate = require('../middlewares/registerValidator');
const createWarehouse = require('../services/createWarehouse');
const registerWarehouse = express.Router();


registerWarehouse.post('/registerWarehouse', validate, createWarehouse , (req, res) => {
    res.send('This is working!');
});

module.exports = registerWarehouse;  