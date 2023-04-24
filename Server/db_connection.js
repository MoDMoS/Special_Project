const express = require('express')
const mysql = require('mysql')
require("dotenv").config()

const app = express()
const port = process.env.PORT
app.use(express.json())

const connection = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
})

connection.connect((err) => {
    if (err) {
        console.log("Error connecting to database =", err);
        return
    }
    console.log("MYSQL Connected!!");
})

const userRouter = require('./routes/user_route')(connection)
const worktimeRoute = require('./routes/worktime_route')(connection)
const newsRoute = require('./routes/news_route')(connection)
const bookingRoute = require('./routes/booking_route')(connection)

app.use('/api/user', userRouter)
app.use('/api/worktime', worktimeRoute)
app.use('/api/news', newsRoute)
app.use('/api/booking', bookingRoute)

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
