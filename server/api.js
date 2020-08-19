const express = require('express');
const mongoose = require('mongoose');
const test = require("./routes/test");
const loginStore = require('./routes/loginStore');
const registerStore = require('./routes/registerStore');
const loginWarehouse = require('./routes/loginWarehouse');
const registerWarehouse = require('./routes/registerWarehouse');
const submitOrder = require('./routes/submitOrder');
const fulfillOrder = require('./routes/fulfillOrder');
const viewStoreOrders = require('./routes/viewStoreOrders');
const viewStoreDeliveries = require('./routes/viewStoreDeliveries');
const viewWarehouseOrders = require('./routes/viewWarehouseOrders');
const viewWarehouseDeliveries = require('./routes/viewWarehouseDeliveries');

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

app.use(test);
app.use(loginStore);
app.use(registerStore);
app.use(loginWarehouse);
app.use(registerWarehouse);
app.use(submitOrder);
app.use(fulfillOrder);
app.use(viewStoreOrders);
app.use(viewStoreDeliveries);
app.use(viewWarehouseOrders);
app.use(viewWarehouseDeliveries);

const port = process.env.PORT || 3000; 
app.listen(port, () => console.log(`Server runing on port ${port}`));
