const Store = require('../models/Store');

function viewSOH(req, res, next) {
    const storeId = res.obj.id;
    Store.find({ id: storeId }, (err, store) => {
        if (err) {
            return res.status(400).send({
                success: false,
                message: err
            });
        } if (!store) {
            return res.status(400).send({
                success: false,
                message: 'This store does not esist'
            });
        } else {
            res.locals.SOH = store[0].SOH;
            next();
        }
    });
};

module.exports = viewSOH;  