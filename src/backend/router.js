const express = require('express')
const router = express.Router()

const ticketController = require('./controllers/ticketController');

const ticketsRouter = express.Router();

router.get('/guests', (req, res) => {
    try {
        /*const uuid = uuidv4();
        connection.query("SELECT * FROM health_records WHERE dob = ? AND name = ?",[
            req.body.dob,
            req.body.name
          ], (error, results) => {
            ...
          });*/
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

router.post('/guest', (req, res) => {
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

router.post('/ticket', ticketController.createTicket);


ticketsRouter.post('/', ticketController.getTickets);
ticketsRouter.get('/report', ticketController.getTicketsReport);
router.use('/tickets', ticketsRouter); 

module.exports = router