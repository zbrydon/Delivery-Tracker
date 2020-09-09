const mqtt = require('mqtt');
const Order = require('../models/Order')

const client = mqtt.connect("mqtt://broker.hivemq.com:1883");

client.on('connect', () => {
    console.log('mqtt connected');
});

function mqttInit(req, res, next) {
    const orderStatus = res.orderStatus;
    const orderId = res.orderId;
    

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
    
    
};
module.exports = mqttInit;