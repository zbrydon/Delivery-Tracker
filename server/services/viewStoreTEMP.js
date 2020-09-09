const Store = require('../models/Store');

function viewTEMP(req, res, next) {
    const storeId = res.obj.id;
    Store.findOne({ id: storeId }, (err, store) => {
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
            res.locals.TEMP = store.TEMP;
            next();
        }
    });
};

module.exports = viewTEMP;  