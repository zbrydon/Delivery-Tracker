const Warehouse = require('../models/Warehouse');

function addSOH(req, res, next) {
    const id = res.obj.id;
    const frozenQuantity = res.frozenQuantity;
    const dairyQuantity = res.dairyQuantity;
    const meatQuantity = res.meatQuantity;
    const produceQuantity = res.produceQuantity;
    const ambientQuantity = res.ambientQuantity;

    const newSOH = {
        frozen: frozenQuantity,
        dairy: dairyQuantity,
        meat: meatQuantity,
        produce: produceQuantity,
        ambient: ambientQuantity
    }
    Warehouse.findOneAndUpdate(
        { id: id },
        { $set: { SOH: newSOH } },
        {
            returnOriginal: false,
            useFindAndModify: false
        },
        (err, warehouse) => {
            if (err) {
                return res.status(400).send({
                    success: false,
                    message: err
                })
            } else {

                res.locals.warehouse = warehouse;
                next();
            }
        });
    
}; 


module.exports = addSOH;
