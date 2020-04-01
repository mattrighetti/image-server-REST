require('rootpath')();
const express = require('express');
const cors = require('cors');
const jwt = require('./utils/jwt');
const errorHandler = require('./utils/error_handler');
const bodyParser = require("body-parser");
const app = express();

const serverPort = process.env.PORT || 5000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use(jwt());

app.use('/', require('./users/user.controller'));
app.use(errorHandler);

app.set("port", serverPort);

/* Start the server on port 5000 */
app.listen(serverPort, function () {
    console.log(`Your app is ready at port ${serverPort}`);
});