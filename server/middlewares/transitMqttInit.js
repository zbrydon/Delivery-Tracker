const mqtt = require('mqtt');
const Order = require('../models/Order')

const client = mqtt.connect("mqtt://broker.hivemq.com:1883");

client.on('connect', () => {
    console.log('mqtt connected');
});

function mqttInit(req, res, next) {
    const orderStatus = res.orderStatus;
    const orderId = res.orderId;
    let storeId = null;
    let warehouseId = null;
    if (res.locals.store != null) {
        storeId = res.locals.store.id;
    }
    if (res.locals.warehouse != null) {
        warehouseId = res.locals.warehouse.id;
    }
    
    
    if (orderStatus || orderId) {
        Order.findOne({ id: orderId }, (err, order) => {
            if (err) {
                return res.json({
                    success: false,
                    message: err
                });
            }
            if (!order) {
                return res.json({
                    success: false,
                    message: 'Invalid Order ID'
                });
            }
            const location = store.location;
            if (orderStatus == "In Transit") {
                const topic = '/219203655/init/';
                const message = JSON.stringify({ orderId, orderStatus, location });
                console.log(topic + " " + message);
                client.publish(topic, message, (err) => {
                    if (err) {
                        return res.status(400).send({
                            success: false,
                            message: err
                        });
                        next();
                    } else {
                        next();
                    }
                });
                next();
            } else {
                next();
            }
        });
    } if ((!orderStatus || !orderId) && storeId != null) {
        console.log(storeId);
        
        const frozenCount = res.locals.store.SOH.frozen;
        const dairyCount = res.locals.store.SOH.dairy;
        const meatCount = res.locals.store.SOH.meat;
        const produceCount = res.locals.store.SOH.produce;
        const ambientCount = res.locals.store.SOH.ambient;

        const topic = '/219203655/init1/';
        const message = JSON.stringify({ storeId, frozenCount, dairyCount, meatCount, produceCount, ambientCount });
        //console.log(topic + " " + message);
        client.publish(topic, message, (err) => {
            if (err) {
                return res.status(400).send({
                    success: false,
                    message: err
                });
                next();
            } else {
                next();
            }
        });
        next();
    } if ((!orderStatus || !orderId) && warehouseId != null) {
        //console.log(res.locals.store.SOH.frozen);

        const frozenCount = res.locals.warehouse.SOH.frozen;
        const dairyCount = res.locals.warehouse.SOH.dairy;
        const meatCount = res.locals.warehouse.SOH.meat;
        const produceCount = res.locals.warehouse.SOH.produce;
        const ambientCount = res.locals.warehouse.SOH.ambient;

        const topic = '/219203655/init2/';
        const message = JSON.stringify({ warehouseId, frozenCount, dairyCount, meatCount, produceCount, ambientCount });
        //console.log(topic + " " + message);
        client.publish(topic, message, (err) => {
            if (err) {
                return res.status(400).send({
                    success: false,
                    message: err
                });
                next();
            } else {
                next();
            }
        });
        next();
    }
    

    
    
};
module.exports = mqttInit;