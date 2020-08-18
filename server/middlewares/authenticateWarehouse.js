const mongoose = require('mongoose');
const Warehouse = require('../models/Warehouse');
const Refresh = require('../models/Refresh');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


function authenticate(req, res, next) {
    const { id, password } = req.body
    Warehouse.findOne({ id: id }, (err, warehouse) => {
        if (err) {
            return res.json({
                success: false,
                message: err
            });
        }
        if (!warehouse) {
            return res.status(406).send({
                success: false,
                message: 'ID does not exist'
            });
        }
        bcrypt.compare(password, warehouse.password, (err, result) => {
            if (result) {
                const payload = { id: id };
                const token = generateAccessToken(payload);
                const refreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET);
                const newRefresh = new Refresh({ refresh: refreshToken });
                newRefresh.save();
                return res.status(200).send({
                    success: true,
                    message: 'Token Generated',
                    token: token,
                    refreshToken, refreshToken
                });
            } else { return res.status(406).send({ success: false, message: 'Authentication failed. Wrong password.' }); }
            
        })

    }

    )
};

function generateAccessToken(payload) {
    return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15m' });
}



module.exports = authenticate;  