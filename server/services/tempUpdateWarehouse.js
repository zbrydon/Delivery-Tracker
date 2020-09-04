const Warehouse = require('../models/Warehouse');

function addTEMP(message, res) {
    const id = message.warehouseId;
    const frozenTemp = message.frozenTemp;
    const dairyTemp = message.dairyTemp;
    const meatTemp = message.meatTemp;
    const produceTemp = message.produceTemp;
    const ambientTemp = message.ambientTemp;
    const newTEMP = {
        frozen: frozenTemp,
        dairy: dairyTemp,
        meat: meatTemp,
        produce: produceTemp,
        ambient: ambientTemp
    }
    Warehouse.findOneAndUpdate(
        { id: id },
        { $set: { TEMP: newTEMP } },
        {
            returnNewDocument: true,
            useFindAndModify: false
        },
        (err, store) => {
            if (err) {
                return res.status(400).send({
                    success: false,
                    message: err
                })
            } else {
                return 
            }
        });
};


module.exports = addTEMP;
