const express = require('express');
const validate = require('../middlewares/loginValidator');
const authenticate = require('../middlewares/authenticateStore');
const loginStore = express.Router();



loginStore.post('/loginStore', validate, authenticate, (req, res) => {
    res.send('This is working!');
});

module.exports = loginStore; 