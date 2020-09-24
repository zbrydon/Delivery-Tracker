const express = require('express');
const mongoose = require('mongoose');
const mqtt = require('mqtt');


/*
 * Imports all the routes to be used in the API 
 */

const test = require("./routes/test");
const registerStore = require('./routes/registerStore');
const registerWarehouse = require('./routes/registerWarehouse');
const submitOrder = require('./routes/submitOrder');
const fulfillOrder = require('./routes/fulfillOrder');
const viewStoreOrders = require('./routes/viewStoreOrders');
const viewWarehouseOrders = require('./routes/viewWarehouseOrders');
const distanceCalc = require('./services/distanceCalc');
const login = require('./routes/login');
const updateWarehouseSOH = require('./routes/updateWarehouseSOH');
const updateStoreSOH = require('./routes/updateStoreSOH');
const viewStoreSOH = require('./routes/viewStoreSOH');
const viewWarehouseSOH = require('./routes/viewWarehouseSOH');
const tempUpdateStore = require('./services/tempUpdateStore');
const viewStoreTEMP = require('./routes/viewStoreTEMP');
const tempUpdateWarehouse = require('./services/tempUpdateWarehouse');
const viewWarehouseTEMP = require('./routes/viewWarehouseTEMP');
const viewStores = require('./routes/viewStores');
const viewOrdersByOrderId = require('./routes/viewOrdersByOrderId');
const updateOrder = require('./routes/updateOrder');
const storeViewWarehouseSOH = require('./routes/storeViewWarehouseSOH');
const viewWarehouses = require('./routes/viewWarehouses');
const deleteorder = require('./routes/deleteOrder');
const viewPopularOrders = require('./routes/viewPopularOrders');
const viewOrder = require('./routes/viewOrder');
const viewWarehouseOrdersToFulfill = require('./routes/viewWarehouseOrdersToFulfill');


/*
 * General setup | Database connection | body-parse setup | Allowing cross origin requests
 */ 

mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true });

const app = express(); 

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-RequestedWith, Content-Type, Accept, Authorization");

    next();
});

/*
 * Including the routes in the API
 */ 

app.use(test);
app.use(registerStore);
app.use(registerWarehouse);
app.use(submitOrder);
app.use(fulfillOrder);
app.use(viewStoreOrders);
app.use(viewWarehouseOrders);
app.use(login);
app.use(updateWarehouseSOH);
app.use(updateStoreSOH);
app.use(viewStoreSOH);
app.use(viewWarehouseSOH);
app.use(viewStoreTEMP);
app.use(viewWarehouseTEMP);
app.use(viewStores);
app.use(updateOrder);
app.use(storeViewWarehouseSOH);
app.use(viewWarehouses);
app.use(deleteorder);
app.use(viewPopularOrders);
app.use(viewOrdersByOrderId);
app.use(viewOrder);
app.use(viewWarehouseOrdersToFulfill);

/*
 * Connecting to the HIVEMC MQTT broker and subscribing to the topic '/219203655/location/'
 */ 

const client = mqtt.connect("mqtt://broker.hivemq.com:1883");

client.on('connect', () => {
    console.log('mqtt connected');
    client.subscribe('/219203655/location/');
    client.subscribe('/219203655/temp1/');
    client.subscribe('/219203655/temp2/');
});

/*
 * Calls the distanceCalc function if there is a message sent with that topic
 */ 

client.on('message', (topic, message) => {
    if (topic == '/219203655/location/') {
        //console.log(JSON.parse(message));
        distanceCalc(JSON.parse(message), function (err) {
            if (err) {
                return res.status(400).send({
                    success: false,
                    message: err
                })
            } else {
                return res.json({
                    success: true,
                    message: 'Calculated'
                })
                
            }
        });
    }
});
client.on('message', (topic, message) => {
    if (topic == '/219203655/temp1/') {
        //console.log(JSON.parse(message));
        tempUpdateStore(JSON.parse(message), function (err, data) {
            if (err) {
                return res.status(400).send({
                    success: false,
                    message: err
                })
            } else {
                return res.json({
                    success: true,
                    message: 'Temp added',
                    data: data
                })

            }
        });
    }
});
client.on('message', (topic, message) => {
    if (topic == '/219203655/temp2/') {
        //console.log(JSON.parse(message));
        tempUpdateWarehouse(JSON.parse(message), function (err, data) {
            if (err) {
                return res.status(400).send({
                    success: false,
                    message: err
                })
            } else {
                console.log(data);
                return res.json({
                    success: true,
                    message: 'Temp added',
                    data: data
                })

            }
        });
    }
});


/*
 * Starts the Server
 */ 

const port = process.env.PORT || 5000; 
app.listen(port, () => console.log(`Server runing on port ${port}`));
