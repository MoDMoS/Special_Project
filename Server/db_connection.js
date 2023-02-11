const express = require('express')
const mysql = require('mysql')

const app = express()

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'special_project'
})

connection.connect((err) => {
    if(err) {
        console.log("Error connecting to database =", err);
        return
    }
    console.log("MYSQL Connected!!");
})

app.get('/', (req, res) => res.send('Hello World!'))
app.listen(3000, () => console.log(`Example app listening on port 3000!`))