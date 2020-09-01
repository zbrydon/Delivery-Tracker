const express = require('express');
const authenticate = require('../middlewares/authenticateTokenStore');
const viewSOH = require('../services/viewStoreSOH');
const viewStoreSOH = express.Router();



viewStoreSOH.get('/viewStoreSOH', authenticate, viewSOH, (req, res) => {
    return res.status(200).send({
        success: true,
        message: 'SOH Displayed',
        SOH: res.locals.SOH
    })
});

module.exports = viewStoreSOH; 