const express = require('express');
const mqtt = require('mqtt');
const coordinates = require('./route.json')
const randomInt = require('random-int');
const Order = require('./models/Order');
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true });

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
        console.log('a');
        const data = JSON.parse(message);
        position(data);
    }
});

async function position(data) {
    const topic = ('/219203655/location/')
    const orderId = data.orderId;

    let frozenTemp = 0;
    let dairyTemp = 0;
    let meatTemp = 0;
    let produceTemp = 0;
    let ambientTemp = 0;

    let frozen = 0;
    let dairy = 0;
    let meat = 0;
    let produce = 0;
    let ambient = 0;

    console.log(orderId);

    await Order.findOne({ orderId: orderId }, (err, order) => {
        if (err) {
            client.publish(topic, err);
            return;
        } else {
            frozen = order.frozenQuantity;
            dairy = order.dairyQuantity;
            meat = order.meatQuantity;
            produce = order.produceQuantity;
            ambient = order.ambientQuantity;
        }

    })
    console.log(orderId);
    ///////////////////////Enable below for production limiting API requests
    for (let i = 0; i < coordinates.coordinates.length; i++) {
        console.log(i);
        if (frozen != 0) {
            frozenTemp = randomInt(-25, -15);
        }
        if (dairy != 0) {
            dairyTemp = randomInt(0, 5)
        } 
        if (meat != 0) {
            meatTemp = randomInt(0, 5)
        }
        if (produce != 0) {
            produceTemp = randomInt(0, 10)
        }
        if (ambient != 0) {
            ambientTemp = randomInt(15, 25)
        }
        let location = coordinates.coordinates[i];
        let message = JSON.stringify({ orderId, location, frozenTemp, dairyTemp, meatTemp, produceTemp, ambientTemp});
        client.publish(topic, message);
        console.log(topic + " " + message);
        i = i + 4;
        await sleep(5000);
    }
    
}
function sleep(ms) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}   



const port = process.env.PORT || 3001;
app.listen(port, () => console.log(`Server runing on port ${port}`));
