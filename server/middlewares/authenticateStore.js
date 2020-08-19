const mongoose = require('mongoose');
const Store = require('../models/Store');
const Refresh = require('../models/Refresh');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


function authenticate(req, res, next) {
    const { id, password } = req.body
    Store.findOne({ id: id }, (err, store) => {
        if (err) {
            return res.json({
                success: false,
                message: err
            });
        }
        if (!store) {
            return res.status(406).send({
                success: false,
                message: 'ID does not exist'
            });
        }
        bcrypt.compare(password, store.password, (err, result) => {
            if (result) {
                const payload = { id: id };
                const token = generateAccessToken(payload);
                //Enable when refresh/logout functionality added
                //const refreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET_STORE);
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
};

function generateAccessToken(payload) {
    return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET_STORE, { expiresIn: '15m' });
}



module.exports = authenticate;  