const express = require('express')
const router = express.Router()

const ticketController = require('./controllers/ticketController');
const ticketsRouter = express.Router();

router.post('/ticket', ticketController.createTicket);
ticketsRouter.get('/spec', ticketController.getTicketSpec);
ticketsRouter.get('/user', ticketController.getTicketsByUser);
router.use('/tickets', ticketsRouter); 

module.exports = router