const express = require('express')
const mysql = require('mysql')
const multer = require('multer');

const app = express()
app.use(express.json())

const storage = multer.diskStorage({
    destination: '/tksgolry/Deepface/assets',
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

const upload = multer({ storage: storage }).single('picture');;

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Koonmos123',
    database: 'databaseproject',
})

connection.connect((err) => {
    if (err) {
        console.log("Error connecting to database =", err);
        return
    }
    console.log("MYSQL Connected!!");
})

app.get('/all', async (req, res) => {
    try {
        connection.query("SELECT * FROM employee", (err, result, fields) => {
            if (err) {
                console.log(err);
                return res.status(400).send()
            }
            return res.status(200).json(result)
        })
    } catch (err) {
        console.log(err);
        return res.status(500).send()
    }
})

app.post('/api/checkuser', function (req, res) {
    let email = req.body.email;
    let id = req.body.id;
    try {
        connection.query("SELECT * FROM employee WHERE Email=" + `'` + email + `'` + 'AND EmployeeID=' + `'` + id + `'`, (err, result, fields) => {
            if (err) {
                console.log(err);
                return res.status(400).send()
            }
            return res.status(200).json(result)
        })
    } catch (err) {
        console.log(err);
        return res.status(500).send()
    }
})

app.post('/api/checkaccount', function (req, res) {
    let EmpID = req.body.EmpID;
    try {
        connection.query("SELECT * FROM account WHERE EmployeeID='" + EmpID + `'`, (err, result, fields) => {
            if (err) {
                console.log(err);
                return res.status(400).send()
            }
            return res.status(200).json(result);
        })
    } catch (err) {
        console.log(err);
        return res.status(500).send()
    }
})

app.post('/api/upload', (req, res) => {
    upload(req, res, function (err) {
        if (err instanceof multer.MulterError) {
            // console.log('Multer error:', err);
            res.status(500).send('Multer error');
        } else if (err) {
            // console.log('Unknown error:', err);
            res.status(500).send('Unknown error');
        } else {
            let pincode = req.body.Pin;
            let EmpID = req.body.EmpID;
            let Device = req.body.Device;
            let Check = req.body.Check;
            if (Check !== '') {
                try {
                    connection.query('UPDATE `account` SET `Pincode`=' + `'` + pincode + `', ` + '`Image`=' + `'/tksgolry/Deepface/assets/` + EmpID + `.jpg', ` + '`Device`=' + `'` + Device + `'` + ' WHERE `EmployeeID` =' + `'` + EmpID + `'`, (err, result, fields) => {
                        if (err) {
                            console.log(err);
                            return res.status(400).send()
                        }
                        return res.status(200).send('File uploaded successfully');
                    })
                } catch (err) {
                    console.log(err);
                    return res.status(500).send()
                }
            } else {
                try {
                    connection.query('INSERT INTO `account`(`EmployeeID`, `Pincode`, `Image`, `Device`) VALUES (' + `'` + EmpID + `', '` + pincode + `', '/tksgolry/Deepface/assets/` + EmpID + `.jpg', '` + Device + `')`, (err, result, fields) => {
                        if (err) {
                            console.log(err);
                            return res.status(400).send()
                        }
                        return res.status(200).send('File uploaded successfully');
                    })
                } catch (err) {
                    console.log(err);
                    return res.status(500).send()
                }
            }

            // console.log(req.body);
            // res.status(200).send('File uploaded successfully');
        }
    });
});

app.get('/api/news', async (req, res) => {
    try {
        connection.query("SELECT `TopicNews`, `NewsDetail` FROM `news` WHERE 1", (err, result, fields) => {
            if (err) {
                console.log(err);
                return res.status(400).send()
            }
            return res.status(200).json(result)
        })
    } catch (err) {
        console.log(err);
        return res.status(500).send()
    }
})

app.listen(3000, () => console.log(`Example app listening on port 3000!`))