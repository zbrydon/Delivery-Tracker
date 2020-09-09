const mongoose = require('mongoose');
const Store = require('../models/Store');
const Refresh = require('../models/Refresh');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


function authenticate(req, res, next) {
    const { id, password } = req.body
    const s = process.env.STORE_ID_LENGTH;
    const w = process.env.WAREHOUSE_ID_LENGTH;
    if (id.length == s.toString()) {
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
                    const tokens = {
                        token: token,
                        refreshToken: 'refreshToken'
                    }
                    res.locals.tokens = tokens;
                    res.locals.type = 'store';
                    next();
                } else { return res.status(406).send({ success: false, message: 'Authentication failed. Wrong password.' }); }

            })

        }

        )
    } else if (id.length == w.toString()) {
        
        next();
    } else {
        return res.status(400).send({ success: false, message: 'Authentication failed' });
    }
    
};

function generateAccessToken(payload) {
    return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET_STORE, { expiresIn: '1h' });
}



module.exports = authenticate;  