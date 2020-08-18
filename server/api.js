const express = require('express');
const mongoose = require('mongoose');
const test = require("./routes/test");
const loginStore = require('./routes/loginStore');
const registerStore = require('./routes/registerStore');

mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true });

const app = express(); 

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(test);
app.use(loginStore);
app.use(registerStore);

const port = process.env.PORT || 3000; 
app.listen(port, () => console.log(`Server runing on port ${port}`));
