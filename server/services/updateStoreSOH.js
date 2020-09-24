const Store = require('../models/Store');

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
    Store.findOneAndUpdate(
        { id: id },
        { $set: { SOH: newSOH } },
        {
            returnOriginal: false,
            useFindAndModify: false
        },
        (err, store) => {
            if (err) {
                return res.status(400).send({
                    success: false,
                    message: err
                })
            } else {
                res.locals.storeSOH = store.SOH;
                res.locals.storeID = store.id;
                next();
            }
        });

}


module.exports = addSOH;
