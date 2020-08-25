const express = require('express');
const validate = require('../middlewares/loginValidator');
const authenticateStore = require('../middlewares/authenticateStore');
const authenticateWarehouse = require('../middlewares/authenticateWarehouse');
const loginStore = express.Router();



loginStore.post('/login', validate, authenticateStore, authenticateWarehouse, (req, res) => {
    res.send('This is working!');
});

module.exports = loginStore; 