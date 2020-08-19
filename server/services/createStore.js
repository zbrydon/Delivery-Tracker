const mongoose = require('mongoose');
const Store = require('../models/Store');
const bcrypt = require('bcrypt');


function createStore(req, res, next) {
    const { id, password, location } = req.body
    
    Store.findOne({ id: id }, (err, store) => {
        if (store) {
            return res.status(406).send({
                success: false,
                message: 'ID already exists'
            });
        }
        console.log('1');
        bcrypt.hash(password, 10, function (err, password_hash) {
            if (err) {
                return res.status(400).send({ success: false, message: err });
            }
            const newStore = new Store({ id: id, password: password_hash, location: location , hasOrdered: false});
            
            newStore.save((err) => {
                if (err) {
                    return res.status(406).send({
                        success: false,
                        message: 'ID or Password in incorrect format'
                    });
                } else {
                    next();
                }

            });
        })
        
    }
        
)};



module.exports = createStore;  