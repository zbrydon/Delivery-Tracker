const mqtt = require('mqtt');


const client = mqtt.connect("mqtt://broker.hivemq.com:1883");

client.on('connect', () => {
    console.log('mqtt connected');
});

function mqttInit(req, res, next) {
    let storeId = res.obj.id
    const topic = '/219203655/init1/';
    const message = JSON.stringify({ storeId });
    client.publish(topic, message, (err) => {
        if (err) {
            return res.status(400).send({
                success: false,
                message: err
            });
            next();
        } else {
            res.locals.storeId = storeId;
            next();
        }
    });


};
module.exports = mqttInit;