const Order = require('../models/Order');

function deleteOrder(req, res, next) {
    const deletee = res.orderId;
    //const Id = res.obj.id;
    //if(Id != the store/warehouse id of the order){
//    THEN return error 'only the owner of the order can delete it '
//}
    const query = { "orderId": deletee };

    Order.deleteOne(query)
        .then(result => console.log(`Deleted ${result.deletedCount} item.`))
        .catch(err => console.error(`Delete failed with error: ${err}`))
    next();
};

module.exports = deleteOrder;  