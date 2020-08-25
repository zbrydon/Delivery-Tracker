const mongoose = require('mongoose');
const Warehouse = require('../models/Warehouse');
const Refresh = require('../models/Refresh');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


function authenticate(req, res, next) {
    const { id, password } = req.body
    const s = process.env.STORE_ID_LENGTH;
    const w = process.env.WAREHOUSE_ID_LENGTH;
    if (id.length == w.toString()) {
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
                    //Enable when refresh/logout functionality added
                    //const refreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET_WAREHOUSE);
                    //const newRefresh = new Refresh({ refresh: refreshToken });
                    //newRefresh.save();
                    //
                    //Add the following to the response

                    //, refreshToken, refreshToken

                    return res.status(200).send({
                        success: true,
                        message: 'Token Generated',
                        token: token
                    });
                } else { return res.status(406).send({ success: false, message: 'Authentication failed. Wrong password.' }); }

            })

        }

        )
    } else if (id.length == s.toString()) {
        next();
    } else {
        return res.status(400).send({
            success: false,
            message: 'Authentication failed'
        });
    }
    
    
};

function generateAccessToken(payload) {
    return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET_WAREHOUSE, { expiresIn: '15m' });
}



module.exports = authenticate;  