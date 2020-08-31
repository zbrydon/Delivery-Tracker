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
                message: 'This store has no SOH'
            });
        } else {
            res.locals.SOH = store[0].SOH;
            next();
        }
    });
};

module.exports = viewSOH;  