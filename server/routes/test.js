const express = require('express');
const test = express.Router();

test.get('/test', (req, res) => {
    res.send('This is working!');
});

module.exports = test;