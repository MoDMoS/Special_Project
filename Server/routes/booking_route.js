const router = require('express').Router();
const auth = require('../middleware/auth')

module.exports = (connection) => {
    const bookingcontrol = require('../controllers/booking_control')(connection)

    router.post('/meeting', bookingcontrol.meeting)
    router.post('/booking', bookingcontrol.booking)
    router.post('/delbooking', bookingcontrol.delBooking)
    router.post('/checkbooking', bookingcontrol.checkBooking)
    router.use((req, res, next) => {
        req.connection = connection;
        next();
    });
    return router
}