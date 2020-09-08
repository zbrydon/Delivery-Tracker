const express = require('express');
const mqtt = require('mqtt');
const randomInt = require('random-int');
const mongoose = require('mongoose');
const Warehouse = require('./models/Warehouse');

mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true });

const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const client = mqtt.connect("mqtt://broker.hivemq.com:1883");

client.on('connect', () => {
    console.log('mqtt connected');
    client.subscribe('/219203655/init2/');
});

client.on('message', (topic, message) => {
    if (topic == '/219203655/init2/') {
        const data = JSON.parse(message);
        position(data);
    }
});

async function position(data) {
    const topic = ('/219203655/temp2/')
    const warehouseId = data.warehouseId;
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

    await Warehouse.findOne({ id: warehouseId }, (err, warehouse) => {
        if (err) {
            client.publish(topic, err);
            return;
        } else {
            frozen = warehouse.SOH.frozen;
            dairy = warehouse.SOH.dairy;
            meat = warehouse.SOH.meat;
            produce = warehouse.SOH.produce;
            ambient = warehouse.SOH.ambient;
        }

    })
    while (frozen != 0 || dairy != 0 || meat != 0 || produce != 0 || ambient != 0) {
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
        let message = JSON.stringify({ warehouseId, frozenTemp, dairyTemp, meatTemp, produceTemp, ambientTemp });
        client.publish(topic, message);
        await sleep(5000);
    }
}
function sleep(ms) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}   



const port = process.env.PORT || 3003;
app.listen(port, () => console.log(`Server runing on port ${port}`));
