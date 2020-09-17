const Order = require("../models/Order");

function viewOrder(req, res, next) {
    const warehouseId = res.obj.id;
    Order.countDocuments({}, (err, count) => {
        if (err) {
            return res.status(400).send({
                success: false,
                message: err
            });
        } else {
            res.locals.count = count;
        }
    });
  Order.find({ warehouseId: warehouseId }, (err, orders) => {
    if (err) {
      return res.status(400).send({
        success: false,
        message: err,
      });
    } else {
      res.locals.orders = orders;
      next();
    }
  });
}

module.exports = viewOrder;
