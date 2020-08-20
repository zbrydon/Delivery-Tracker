const express = require('express');
const mqtt = require('mqtt');
const coordinates = require('./location.json')

const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const client = mqtt.connect("mqtt://broker.hivemq.com:1883");

client.on('connect', () => {
    console.log('mqtt connected');
    client.subscribe('/219203655/init/');
});

client.on('message', (topic, message) => {
    if (topic == '/219203655/init/') {
        const data = JSON.parse(message);
            
        console.log(data);
        console.log(data.deliveryId);
        console.log(data.deliveryStatus);
        console.log(data.location);
        console.log(data.location.lat);
        console.log(data.location.long);

        position(data);
    }
});

async function position(data) {
    const topic = ('/219203655/location/')
    const destination = data.location;
    const deliveryId = data.deliveryId;
    const deliveryStatus = data.deliveryStatus;
    ///////////////////////Enable below for production limiting API requests
    for (let i = 0; i < 1 /*coordinates.coordinates.length*/; i++) {
        let location = coordinates.coordinates[i];
        let message = JSON.stringify({ deliveryId, deliveryStatus, destination, location });
        client.publish(topic, message);
        await sleep(1000);
    }
    
}
function sleep(ms) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}   



const port = process.env.PORT || 3001;
app.listen(port, () => console.log(`Server runing on port ${port}`));
