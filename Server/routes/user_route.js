const router = require('express').Router();
const auth = require('../middleware/auth')
const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, '/tksgolry/Deepface/assets/');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

const upload = multer({ storage: storage })

module.exports = (connection) => {
    const usercontrol = require('../controllers/user_control')(connection)

    router.post('/login', usercontrol.login)
    router.post('/sendRefCode', usercontrol.sendRefCode)
    router.post('/checkref', usercontrol.checkRef)
    router.post('/checkuser', usercontrol.checkUser)
    router.post('/checkaccount', usercontrol.checkAccount)
    router.post('/upload', upload.single('picture'), usercontrol.upload)
    router.get('/contacts', usercontrol.contacts)
    router.use((req, res, next) => {
        req.connection = connection;
        next();
    });
    return router
}