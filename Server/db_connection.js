const express = require('express')
const mysql = require('mysql')

const app = express()
app.use(express.json())

const connection = mysql.createConnection({
    host: '171.99.253.60',
    user: 'AdminTKS',
    password: '',
    database: 'special_project',
})

connection.connect((err) => {
    if(!!err) {
        console.log("Error connecting to database =", err);
    }
    else {
        console.log('Connected...');
    }
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
    if (email) {
        connection.query()
    }
})

app.listen(3001, () => console.log(`Example app listening on port 3000!`))
module.exports = connection