const express = require('express');
const test = require("./routes/test");
const loginStore = require('./routes/loginStore');

const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());



app.use(test);
app.use(loginStore);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server runing on port ${port}`));
