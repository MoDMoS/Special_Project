const express = require('express')
const mysql = require('mysql')
const multer = require('multer');
const fs = require('fs')

const app = express()
app.use(express.json())

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, '/tksgolry/Deepface/assets/');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

const upload = multer({ storage: storage })

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

app.post('/api/upload', upload.single('picture'), (req, res) => {
    console.log(req.file);
    if (!req.file) {
        return res.status(400).send('No file uploaded');
    }
    let pincode = req.body.Pin;
    let EmpID = req.body.EmpID;
    let Device = req.body.Device;
    let Check = req.body.Check;

    fs.access(req.file.path, fs.constants.F_OK, (err) => {
        if (err) {
            // File with same name already exists, delete it
            fs.unlink(req.file.path, (err) => {
                if (err) {
                    console.log(err);
                    return res.status(500).send('Error deleting existing file');
                }
                console.log('Existing file deleted');
            });
        }
        if (Check !== '') {
            try {
                connection.query('UPDATE `account` SET `Pincode`=' + `'` + pincode + `', ` + '`Image`=' + `'` + req.file.path + `',` + '`Device`=' + `'` + Device + `'` + ' WHERE `EmployeeID` =' + `'` + EmpID + `'`, (err, result, fields) => {
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
                connection.query('INSERT INTO `account`(`EmployeeID`, `Pincode`, `Image`, `Device`) VALUES (' + `'` + EmpID + `', '` + pincode + `', '` + req.file.path + `', '` + Device + `')`, (err, result, fields) => {
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

app.get('/api/newspin', async (req, res) => {
    try {
        connection.query("SELECT * FROM `news` WHERE `Pin` = 1", (err, result, fields) => {
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

app.get('/api/contacts', async (req, res) => {
    try {
        connection.query("SELECT `TitleName`, `FirstName`, `LastName`, `PhoneNumber`, `Email`, `DepartmentName` FROM `employee` WHERE 1", (err, result, fields) => {
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

app.post('/api/reports', async (req, res) => {
    let EmpID = req.body.EmpID;
    try {
        connection.query("SELECT DATE_FORMAT(checkin.CheckInDate, '%d/%m/%y') AS CheckInDate, checkin.CheckInTime, DATE_FORMAT(checkout.CheckOutDate, '%d/%m/%y') AS CheckOutDate, checkout.CheckOutTime FROM checkin LEFT JOIN checkout ON checkin.EmployeeID = checkout.EmployeeID AND checkin.CheckInDate = checkout.CheckOutDate WHERE checkin.EmployeeID='" + EmpID + "' AND (checkout.CheckOutDate IS NULL OR DATE(checkin.CheckInDate) = DATE(checkout.CheckOutDate));", (err, result, fields) => {
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