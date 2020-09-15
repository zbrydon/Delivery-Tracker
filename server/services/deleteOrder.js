const Order = require('../models/Order');

function deleteOrder(req, res, next) {
    const deletee = res.orderId;
    const storeId = res.storeId;
    const query = { "orderId": deletee };

    Order.findOne({ orderId: deletee }, (err, order) => {
        if (err) {
            return res.status(400).send({
                success: false,
                message: err
            });
        } if (!order) {
            return res.status(404).send({
                success: false,
                message: 'Order does not exist'
            });
        } if (order.storeId != storeId) {
            return res.status(406).send({
                success: false,
                message: 'Order does not belong to this store'
            });
        }
        if (order.orderStatus == "In Transit" || order.orderStatus == "Delivered") {
            return res.status(406).send({
                success: false,
                message: 'Order cannot be deleted it has left the warehouse'
            });
        }
    }
    Order.deleteOne(query)
        .then(result => console.log(`Deleted ${result.deletedCount} item.`))
        .catch(err => console.error(`Delete failed with error: ${err}`))
    next();
};

module.exports = deleteOrder;  