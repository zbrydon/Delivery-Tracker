const express = require('express');
const mqtt = require('mqtt');
const randomInt = require('random-int');

const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const client = mqtt.connect("mqtt://broker.hivemq.com:1883");

client.on('connect', () => {
    console.log('mqtt connected');
    client.subscribe('/219203655/init1/');
});

client.on('message', (topic, message) => {
    if (topic == '/219203655/init1/') {
        const data = JSON.parse(message);
        position(data);
    }
});

async function position(data) {
    const topic = ('/219203655/temp1/')
    const storeId = data.storeId;
    let frozenTemp = 0;
    let dairyTemp = 0;
    let meatTemp = 0;
    let produceTemp = 0;
    let ambientTemp = 0;

    //Re-visit how to display data when only some SOH is present
    while (data.frozenCount != 0 || data.dairyCount != 0 || data.meatCount != 0 || data.produceCount != 0 || data.ambientCount != 0) {
        if (data.frozenCount != 0) {
            frozenTemp = randomInt(-25, -15);
        }
        if (data.dairyCount != 0) {
            dairyTemp = randomInt(0, 5)
        }
        if (data.meatCount != 0) {
            meatTemp = randomInt(0, 5)
        }
        if (data.produceCount != 0) {
            produceTemp = randomInt(0, 10)
        }
        if (data.ambientCount != 0) {
            ambientTemp = randomInt(15, 25)
        }
        let message = JSON.stringify({ storeId, frozenTemp, dairyTemp, meatTemp, produceTemp, ambientTemp });
        client.publish(topic, message);
        await sleep(5000);
    }
    
}
function sleep(ms) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}   



const port = process.env.PORT || 3002;
app.listen(port, () => console.log(`Server runing on port ${port}`));
