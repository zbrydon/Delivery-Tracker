const express = require('express');
const validate = require('../middlewares/registerValidator');
const createStore = require('../services/createStore');
const registerStore = express.Router();


registerStore.post('/registerStore', validate, createStore , (req, res) => {
    res.send('This is working!');
});

module.exports = registerStore;  