const Delivery = require('../models/Delivery');

function updateDelivery(req, res, next) {
    const updated = res.deliveryId;
    const newdeliveryStatus = res.deliveryStatus;

    Delivery.findOneAndUpdate(
        { deliveryId: updated },
        { $set: { deliveryStatus: newdeliveryStatus } },
        { returnNewDocument: true ,
         useFindAndModify: false },
        (err, delivery) => {
            if (err) {
                return res.status(400).send({
                    success: false,
                    message: err
                });
            } else {
                res.delivery = delivery;
                next();
            }
        });

};

module.exports = updateDelivery;  