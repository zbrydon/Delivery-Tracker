const Order = require('../models/Order');
const url = require("url");

function viewOrder(req, res, next) {
    const warehouseId = res.obj.id;
    const query = url.parse(req.url, true).query;
    const storeId = query.storeId;
    Order.find({ warehouseId: warehouseId , storeId: storeId }, (err, orders) => {
        if (err) {
            return res.status(400).send({
                success: false,
                message: err
            });
        } if (!orders) {
            return res.status(400).send({
                success: false,
                message: 'This store has no orders'
            });
        } else {
            let frozenQuantity = 0;
            let dairyQuantity = 0;
            let meatQuantity = 0;
            let produceQuantity = 0;
            let ambientQuantity = 0;
            for (let i = 0; i < orders.length; i++) {
                frozenQuantity = frozenQuantity + (orders[i].frozenQuantity);
                dairyQuantity = dairyQuantity + orders[i].dairyQuantity;
                meatQuantity = meatQuantity + orders[i].meatQuantity;
                produceQuantity = produceQuantity + orders[i].produceQuantity;
                ambientQuantity = ambientQuantity + orders[i].ambientQuantity;
            }            
            const totals = {
                frozen: frozenQuantity,
                dairy: dairyQuantity,
                meat: meatQuantity,
                produce: produceQuantity,
                ambient: ambientQuantity
            }           
            res.locals.storeId = storeId;
            res.locals.totals = totals;
            next();
        }
    });
};

module.exports = viewOrder;  