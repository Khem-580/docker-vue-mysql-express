const express = require('express')
const router = express.Router()

const ticketController = require('./controllers/ticketController');
const ticketsRouter = express.Router();

router.post('/ticket', ticketController.createTicket);
ticketsRouter.post('/', ticketController.getTickets);
ticketsRouter.get('/report', ticketController.getTicketsReport);
router.use('/tickets', ticketsRouter); 

module.exports = router