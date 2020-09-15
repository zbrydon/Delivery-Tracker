const Order = require("../models/Order");
const url = require("url");

function viewOrder(req, res, next) {
  const query = url.parse(req.url, true).query;
  const storeId = query.storeId;
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
  Order.find({ warehouseId: warehouseId, storeId: storeId }, (err, orders) => {
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
