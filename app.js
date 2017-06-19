const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const routes = require('./routes/routes');

const app = express();

mongoose.Promise = global.Promise;

if (process.env.NODE_ENV !== 'test') {
    mongoose.connect('mongodb://localhost/muber');
}

// app.use() is used to register middleware with express.

app.use(bodyParser.json()); // must be placed above routes call!!
routes(app);

// err will be defined if previous middleware in the chain throws an error
app.use((err, req, res, next) => {
    res.status(422).send({ error: err.message });
})

module.exports = app;
