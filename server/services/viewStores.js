const Store = require('../models/Store');

function viewStores(req, res, next) {
    Store.find({ hasOrdered: true }, {id:1 , _id:0} , (err, stores) => {
        if (err) {
            return res.status(400).send({
                success: false,
                message: err
            });
        }
        const exists = stores[0]
        if (!exists) {
            return res.status(400).send({
                success: false,
                message: 'No Stores have Ordered'
            });
        } else {
            res.locals.stores = stores;
            next();
        }
    });
};

module.exports = viewStores;  