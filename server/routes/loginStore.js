const express = require('express');
const validate = require('../middlewares/validator');
const loginStore = express.Router();

loginStore.post('/', validate, (req, res) => {
    res.send('This is working!');
});

module.exports = loginStore; 