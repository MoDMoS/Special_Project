module.exports = (connection) => {
    const meeting = (req, res) => {
        const { Date, Start, End } = req.body
    
        try {
            connection.query("SELECT * FROM meetingroom WHERE RoomID NOT IN ( SELECT RoomID FROM booking_approve WHERE Date = '" + Date + "' AND ((StartTime <= '" + Start + "' AND EndTime > '" + Start + "') OR (StartTime < '" + End + "' AND EndTime >= '" + End + "') OR (StartTime >= ' " + Start + "' AND EndTime <= '" + End + "')))", (err, result, fields) => {
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

    const booking = (req, res) => {
        const { RoomID, Topic, EmpID, Start, End, Date } = req.body
    
        try {
            connection.query("INSERT INTO `booking_approve`(`RoomID`, `Topic`, `EmployeeID`, `StartTime`, `EndTime`, `Date`, `Status`) VALUES ('" + RoomID + "','" + Topic + "','" + EmpID + "','" + Start + "','" + End + "','" + Date + "','Wait')", (err, result, fields) => {
                if (err) {
                    console.log(err);
                    return res.status(400).send()
                }
                return res.status(200).send("Success")
            })
        } catch (err) {
            console.log(err);
            return res.status(500).send()
        }
    }

    const delBooking = (req, res) => {
        const { BookingID, Date, Start, End } = req.body
    
        try {
            connection.query(`DELETE FROM booking_approve WHERE BookingID = '${BookingID}' AND Date = '${Date}' AND StartTime = '${Start}' AND EndTime = '${End}' `, (err, result, fields) => {
                if (err) {
                    console.log(err);
                    return res.status(400).send();
                }
                return res.status(200).json(result);
            });
        } catch (err) {
            console.log(err);
            return res.status(500).send();
        }
    }

    const checkBooking = (req, res) => {
        const { EmpID } = req.body;
        try {
            connection.query("SELECT * FROM `booking_approve` WHERE `EmployeeID` = '" + EmpID + "' AND Date BETWEEN NOW() - INTERVAL 3 MONTH AND NOW() - INTERVAL 30 MINUTE", (err, result, fields) => {
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
        meeting, booking, delBooking, checkBooking
    }
}