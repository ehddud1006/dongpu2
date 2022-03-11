const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 5000;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const router = require("express").Router();

const data = fs.readFileSync('./database.json');
const conf = JSON.parse(data);
const mysql = require('mysql');

const connection = mysql.createConnection({
    host: conf.host,
    user: conf.user,
    password: conf.password,
    port: conf.port,
    database: conf.database
});
connection.connect();



app.get('/api/customers', (req, res) => {
    console.log("hh")
    connection.query(
        'SELECT * FROM RESTAURANT_MAIN',
        (err, rows, fields) => {
            console.log(rows)
            res.send(rows);
        }
    )
});

// let a 
// app.post("/api/detail", async (req, res) => {
//     console.log(req.body.data)
//     a=req.body.data
//     connection.query(
//         'SELECT * FROM RESTAURANT_DETAIL WHERE ID=2',
//         (err, rows, fields) => {
//             console.log(rows)
//             res.send(rows);
//         }
//     )
// });

// console.log("50"+a)

app.post('/api/detail',  (req, res) => {
    console.log(req.body.data)
    num = req.body.data
    connection.query(
        `SELECT * FROM RESTAURANT_DETAIL WHERE ID=${num}`,
        (err, rows, fields) => {
            // console.log(rows)
            res.send(rows);
        }
    )
})


app.listen(port, () => console.log(`Listening on port ${port}`)); 