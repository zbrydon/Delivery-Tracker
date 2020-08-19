const Delivery = require('../models/Delivery');

function viewDelivery(req, res, next) {
    const storeId = res.storeId;
    Delivery.find({ delivery: storeId }, (err, deliveries) => {
        if (err) {
            return res.status(400).send({
                success: false,
                message: err
            });
        } else {
            return res.send(deliveries);
            next();
        }
    });
};

module.exports = viewDelivery;  