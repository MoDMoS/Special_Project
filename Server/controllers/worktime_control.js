module.exports = (connection) => {
    const check_InOrOut = (req, res) => {
        const { EmpID, Date } = req.body;

        try {
            connection.query("SELECT `EmployeeID`, `CheckInDate` FROM `checkin` WHERE `EmployeeID` = '" + EmpID + "' and `CheckInDate` = '" + Date + `'`, (err, result, fields) => {
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

    const checkIn = (req, res) => {
        const { EmpID, Date, Time, Location, Model } = req.body

        try {
            connection.query("INSERT INTO `checkin`(`EmployeeID`, `CheckInDate`, `CheckInTime`, `Location`, `Model`) VALUES (" + `'` + EmpID + `','` + Date + `','` + Time + `','` + Location + `','` + Model + `')`, (err, result, fields) => {
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

    const checkOut = (req, res) => {
        const { EmpID, Date, Time, Location, Model } = req.body
    
        try {
            connection.query("INSERT INTO `checkout`(`EmployeeID`, `CheckOutDate`, `CheckOutTime`, `Location`, `Model`) VALUES (" + `'` + EmpID + `','` + Date + `','` + Time + `','` + Location + `','` + Model + `')`, (err, result, fields) => {
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

    const reports = (req, res) => {
        const { EmpID } = req.body;
        try {
            connection.query(`SELECT Date_FORMAT(checkin.CheckInDate, '%d/%m/%y') AS CheckInDate, checkin.CheckInTime, Date_FORMAT(checkout.CheckOutDate, '%d/%m/%y') AS CheckOutDate, checkout.CheckOutTime, TIMEDIFF(checkout.CheckOutTime, checkin.CheckInTime) AS ShiftDuration, ADDTIME(checkin.CheckInTime, TIMEDIFF(checkout.CheckOutTime, checkin.CheckInTime)) AS EndTime FROM checkin  LEFT JOIN checkout  ON checkin.EmployeeID = checkout.EmployeeID AND checkin.CheckInDate = checkout.CheckOutDate  WHERE checkin.EmployeeID = '${EmpID}' AND (checkout.CheckOutDate IS NULL OR Date(checkin.CheckInDate) = Date(checkout.CheckOutDate)) AND checkin.CheckInDate BETWEEN DATE_SUB(NOW(), INTERVAL 6 MONTH) AND NOW()`, (err, result, fields) => {
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
        check_InOrOut, checkIn, checkOut, reports
    }
}