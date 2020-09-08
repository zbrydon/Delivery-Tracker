const mqtt = require('mqtt');


const client = mqtt.connect("mqtt://broker.hivemq.com:1883");

client.on('connect', () => {
    console.log('mqtt connected');
});

function mqttInit(req, res, next) {
    let warehouseId = res.obj.id
    const topic = '/219203655/init2/';
    const message = JSON.stringify({ warehouseId });
    client.publish(topic, message, (err) => {
        if (err) {
            return res.status(400).send({
                success: false,
                message: err
            });
            next();
        } else {
            res.warehouseId = warehouseId;
            next();
        }
    });


};
module.exports = mqttInit;