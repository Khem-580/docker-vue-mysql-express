require('dotenv').config();
const { v4: uuidv4 } = require('uuid');
const db = require('./config/db');
const express = require('express');
const cors = require('cors');
const app = express();
const router = require('./router')

const port = process.env.APP_PORT || 9400;
app.use(express.json());
app.use(express.urlencoded());
app.use(cors());
app.use('/', router);
app.options('*', cors());

app.listen(port, () => {
    console.log(`Example app listening at ${process.env.DB_HOST}:${port}`)
})
