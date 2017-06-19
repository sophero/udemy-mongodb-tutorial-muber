const Driver = require('../models/driver');

module.exports = {
    // greeting: function(req, res) {} // ES5 syntax
    greeting(req, res) { // ES6 syntax
        res.send({ hi: 'there' });
    },

    index(req, res, next) {
        const { lng, lat } = req.query;
        // req.query is the parsed obj of params listed after the question mark in the url.
        // eg. http://google.com?lng=80&lat=20
        Driver.geoNear(
            {type: 'Point', coordinates: [parseFloat(lng), parseFloat(lat)]},
            {spherical: true, maxDistance: 200000} // maxDistance unit is metres.
        )
        .then(drivers => res.send(drivers))
        .catch(next);
    },

    create(req, res, next) {
        const driverProps = req.body;
        Driver.create(driverProps)
            .then(driver => res.send(driver))
            .catch(next); //weird how next isn't called with parentheses..
    },
    // The next function forcibly goes to the next middleware.
        // Never automatically called in express middleware - you have to call it!
        // This will pass the error to the error handler middleware that you defined in app.js

    edit(req, res, next) {
        const driverId = req.params.id;
        const driverProps = req.body;

        Driver.findByIdAndUpdate(driverId, driverProps)
            .then(() => Driver.findById(driverId))
            .then(driver => res.send(driver))
            .catch(next);
    },

    delete(req, res, next) {
        const driverId = req.params.id;

        Driver.findByIdAndRemove(driverId)
            .then(driver => res.status(204).send(driver))
            .catch(next);
    }

};
