const express = require('express');
const validate = require('../middlewares/loginValidator');
const authenticateStore = require('../middlewares/authenticateStore');
const authenticateWarehouse = require('../middlewares/authenticateWarehouse');
const loginStore = express.Router();



loginStore.post('/login', validate, authenticateStore, authenticateWarehouse, (req, res) => {
    return res.status(200).send({
        success: true,
        message: 'Logged In',
        tokens: res.locals.tokens,
        type: res.locals.type
    })
});

module.exports = loginStore; 