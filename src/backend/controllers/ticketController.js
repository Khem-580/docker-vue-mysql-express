const { db } = require("../config");
const validate = require("validate.js");

exports.createTicket = async function (req, res) {
  let inputErrors;
  try {
    inputErrors = createTicketValidator(req);
    if (inputErrors) {
      throw "Invalid input";
    }
    const sqlTicketSpec = `SELECT * FROM ticket_spec WHERE ticket_type = ? LIMIT 1`;
    const ticketSpec = await db.query(sqlTicketSpec, [req.body.ticketType]);
    if (ticketSpec.length == 0) {
      throw "Ticket type has no result";
    } else if (!(req.body.amount >= ticketSpec[0].min_amount_per_order)) {
      throw `This ticket type has minimum amount per purchase (${ticketSpec[0].min_amount_per_order})`;
    }
    const sqlCountTicketsByType = `SELECT SUM(amount) FROM tickets WHERE ticket_spec_id='${ticketSpec[0].id}';`
    let countTicket = await db.query(sqlCountTicketsByType);
    countTicket = countTicket[0]['SUM(amount)'];
    if (countTicket > ticketSpec[0].max_amount_per_day) {
      throw "This ticket type is not available for now, please try again tomorrow";
    }
    const sqlInsertTicket = `INSERT INTO tickets(full_name, ticket_spec_id, amount) VALUES (?,'${ticketSpec[0].id}',?);`;
    await db.query(sqlInsertTicket, [req.body.fullname, req.body.amount]);
    res.status(200).send({
      state: "success",
      message: "Create tickets successfully",
    });
  } catch (err) {
    res.status(400).send({
      state: "failure",
      message: err,
      inputErrors: inputErrors ? inputErrors : {},
    });
  }
};

exports.getTickets = function (req, res) {
  res.send("NOT IMPLEMENTED: Site Home Page");
};

exports.getTicketsReport = function (req, res) {
  res.send("NOT IMPLEMENTED: Book list");
};

const createTicketValidator = function (req) {
  const schema = {
    fullname: {
      presence: true,
      length: {
        minimum: 2,
        maximum: 512,
      },
    },
    ticketType: {
      presence: true,
      length: {
        maximum: 32,
      },
    },
    amount: {
      presence: true,
      numericality: {
        onlyInteger: true,
        greaterThan: 0,
      },
    },
  };
  return validate(req.body, schema);
};
