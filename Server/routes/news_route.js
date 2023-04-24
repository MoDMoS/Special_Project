const router = require('express').Router();
const auth = require('../middleware/auth')

module.exports = (connection) => {
    const newscontrol = require('../controllers/news_control')(connection)

    router.get('/news', newscontrol.news)
    router.get('/newspin', newscontrol.newspin)
    router.use((req, res, next) => {
        req.connection = connection;
        next();
    });
    return router
}