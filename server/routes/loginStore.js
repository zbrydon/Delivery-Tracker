const express = require('express');
const validate = require('../middlewares/loginValidator');
const authenticate = require('../middlewares/authenticate');
const loginStore = express.Router();



loginStore.post('/', validate, authenticate, (req, res) => {
    res.send('This is working!');
});

module.exports = loginStore; 