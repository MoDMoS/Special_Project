const { createTransport } = require('../middleware/transporter')
const { jwtGenerate } = require('../middleware/auth')
const { generateReferenceCode } = require('../middleware/generateReferenceCode')
const fs = require('fs')

module.exports = (connection) => {
    const login = (req, res) => {
        const empID = req.body.EmpID

        const access_token = jwtGenerate(empID)

        return res.status(200).json({ access_token })
    }

    const sendRefCode = (req, res) => {
        const { EmpID, Email } = req.body;

        const referenceCode = generateReferenceCode();

        const message = {
            from: 'koonmos367@gmail.com',
            to: Email,
            subject: 'Registration reference code',
            text: `Dear user,\n\nThank you for registering for our app. Your registration reference code is: ${referenceCode}\n\nRegards,\nThe App Team`,
        };

        const transporter = createTransport()
        transporter.sendMail(message, (error, info) => {
            if (error) {
                console.error('Error:', error);
                res.status(500).send({ error: 'Failed to send email' });
            } else {
                // console.log('Email sent:', info.response);
                try {
                    connection.query(`UPDate employee SET RefCode= '${referenceCode}' WHERE EmployeeID = '${EmpID}'`, (err, result, fields) => {
                        if (err) {
                            console.log(err);
                            return res.status(400).send()
                        }
                        // return res.status(200).json(result)
                        res.send({ message: 'Reference code sent successfully' });
                    })
                } catch (err) {
                    console.log(err);
                    return res.status(500).send()
                }
            }
        });
    }

    const checkRef = (req, res) => {
        const { Email, EmpID, Ref } = req.body;
        try {
            connection.query(`SELECT EmployeeID FROM employee WHERE Email='${Email}'AND EmployeeID='${EmpID}' AND RefCode='${Ref}'`, (err, result, fields) => {
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
    }

    const checkUser = (req, res) => {
        const { Email, EmpID } = req.body;
        try {
            connection.query("SELECT * FROM employee WHERE Email=" + `'` + Email + `'` + 'AND EmployeeID=' + `'` + EmpID + `'`, (err, result, fields) => {
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
    }

    const checkAccount = (req, res) => {
        const EmpID = req.body.EmpID;
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
    }

    const upload = (req, res) => {
        console.log(req.file);
        if (!req.file) {
            return res.status(400).send('No file uploaded');
        }
        const { Pin, EmpID, Device, Check } = req.body;

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
                    connection.query('UPDate `account` SET `Pincode`=' + `'` + Pin + `', ` + '`Image`=' + `'` + req.file.path + `',` + '`Device`=' + `'` + Device + `'` + ' WHERE `EmployeeID` =' + `'` + EmpID + `'`, (err, result, fields) => {
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
                    connection.query('INSERT INTO `account`(`EmployeeID`, `Pincode`, `Image`, `Device`) VALUES (' + `'` + EmpID + `', '` + Pin + `', '` + req.file.path + `', '` + Device + `')`, (err, result, fields) => {
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
    }

    const contacts = (req, res) => {
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
    }

    return {
        login, sendRefCode, checkRef, checkUser, checkAccount, upload, contacts
    }
}