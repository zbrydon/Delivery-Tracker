const mqtt = require('mqtt');
const Order = require('../models/Order')

const client = mqtt.connect("mqtt://broker.hivemq.com:1883");

client.on('connect', () => {
    console.log('mqtt connected');
});

function mqttInit(req, res, next) {
    const orderId = res.orderId;
    const orderStatus = res.orderStatus;
    
    if (orderStatus == "In Transit") {
        const topic = '/219203655/init/';
        const message = JSON.stringify({ orderId });
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
    } else {
        next();
    }
    
    
};
module.exports = mqttInit;