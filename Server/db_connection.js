const express = require('express')
const mysql = require('mysql')

const app = express()
app.use(express.json())

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Koonmos123',
    database: 'databaseproject',
})

connection.connect((err) => {
    if(err) {
        console.log("Error connecting to database =", err);
        return
    }
    console.log("MYSQL Connected!!");
})
 
app.get('/all', async (req, res) => {
    try {
        connection.query("SELECT * FROM employee", (err, result, fields) => {
            if(err) {
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

app.post('/api/regis', function (req, res) {
    let email = req.body.email;
    let id = req.body.id;
    try {
        connection.query("SELECT * FROM employee WHERE Email="+ `'`+ email + `'` + 'AND EmployeeID=' + `'` + id + `'`, (err, result, fields) => {
        if(err) {
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

app.get('/api/news', async (req, res) => {
    try {
        connection.query("SELECT `TopicNews`, `NewsDetail` FROM `news` WHERE 1", (err, result, fields) => {
            if(err) {
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