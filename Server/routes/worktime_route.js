const router = require('express').Router();
const auth = require('../middleware/auth')

module.exports = (connection) => {
    const worktimecontrol = require('../controllers/worktime_control')(connection)

    router.post('/check_InOrOut', worktimecontrol.check_InOrOut)
    router.post('/checkin', worktimecontrol.checkIn)
    router.post('/checkout', worktimecontrol.checkOut)
    router.post('/reports', worktimecontrol.reports)
    // router.post('/verify', auth.verifyToken)
    router.use((req, res, next) => {
        req.connection = connection;
        next();
    });
    return router
}