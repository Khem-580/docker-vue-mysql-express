require('dotenv').config();
const db = require('./config/db');
const express = require('express');
const cors = require('cors');
const app = express();

const port = process.env.APP_PORT || 9400;
app.use(express.json());
app.use(express.urlencoded());
app.use(cors());
app.options('*', cors());

app.get('/guests', (req, res) => {
    try {
        db.query(`
            SELECT * FROM my_guests ORDER BY id DESC
        `, function (err, rows, fields) {
                if (err)
                    throw err
                res.status(200).send({
                    "state": "success",
                    "data": rows
                });
            }
        );
    } catch (err) {
        res.status(400).send({
            "state": "failure",
            "message": err
        });
    }
})

app.post('/guest', (req, res) => {
    try {
        if (!req.body.name) {
            throw "name is required";
        }
        db.query(`
            INSERT INTO my_guests (guest_name)
            VALUES ("${req.body.name}");
        `, function (err, rows, fields) {
                if (err) throw err
                res.status(200).send({
                    "state": "success",
                    "message": rows
                })
            }
        );
    } catch (err) {
        res.status(400).send({
            "state": "failure",
            "message": err
        });
    }
})

app.listen(port, () => {
    console.log(`Example app listening at ${process.env.DB_HOST}:${port}`)
})

