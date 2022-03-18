const { db } = require("../config");
const validate = require("validate.js");

exports.createTicket = async function (req, res) {
  let inputErrors;
  try {
    inputErrors = createTicketValidator(req.body);
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
    const todayDate = new Date().toJSON().slice(0, 10);
    const sqlCountTicketsByType = `
      SELECT
        SUM(amount) 
      FROM
        tickets 
      WHERE ticket_spec_id='${ticketSpec[0].id}'
      AND DATE(created_at) = '${todayDate}';
    `;
    let countTicket = await db.query(sqlCountTicketsByType);
    countTicket = countTicket[0]["SUM(amount)"];
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

exports.getTicketSpec = async function (_req, res) {
  try {
    const sqlTicketSpec = `SELECT * FROM ticket_spec`;
    const ticketSpec = await db.query(sqlTicketSpec);
    res.status(200).send({
      state: "success",
      data: ticketSpec,
    });
  } catch (err) {
    res.status(400).send({
      state: "failure",
      message: err,
    });
  }
};

exports.getTicketsByUser = async function (req, res) {
  let inputErrors;
  try {
    inputErrors = getTicketsByUserValidator(req.query);
    if (inputErrors) {
      throw "Invalid input";
    }
    let sqlUserTicket = `SELECT * FROM tickets WHERE full_name=?`;
    let sqlUserTicketParams = [req.query.fullname];
    if (req.query.ticketType) {
      const sqlTicketSpec = `
        SELECT * 
        FROM ticket_spec 
        WHERE ticket_type=? LIMIT 1
      `;
      const ticketSpec = await db.query(sqlTicketSpec, [req.query.ticketType]);
      if (ticketSpec.length > 0) {
        sqlUserTicket += ` AND ticket_spec_id=?`;
        sqlUserTicketParams.push(ticketSpec[0].id);
      } else {
        throw "Ticket type is invalid";
      }
    }
    if (req.query.date) {
      sqlUserTicket += ` AND created_at between ? AND ?`;
      sqlUserTicketParams.push(
        req.query.date + " 00:00:00",
        req.query.date + " 23:59:59"
      );
    }
    const userTicket = await db.query(sqlUserTicket, sqlUserTicketParams);
    res.status(200).send({
      state: "success",
      data: userTicket,
    });
  } catch (err) {
    res.status(400).send({
      state: "failure",
      message: err,
      inputErrors: inputErrors ? inputErrors : {},
    });
  }
};

exports.getTicketsReservation = async function (req, res) {
  try {
    const sqlTicketsReservationParams = [1];
    let sqlTicketsReservation = `
      SELECT 
      DATE(t.created_at) date,
      ts.ticket_type ticket_type,
      SUM(t.amount) sum_amount,
        ts.max_amount_per_day max_amount_per_day,
        IF(SUM(t.amount)>ts.max_amount_per_day, 0, 1) is_available
      FROM 
        tickets t
      INNER JOIN 
        ticket_spec ts
      ON t.ticket_spec_id = ts.id
      WHERE ?
      GROUP BY DATE(t.created_at), ts.ticket_type, ts.max_amount_per_day
    `;
    if (req.query.date) {
      sqlTicketsReservation = sqlTicketsReservation.replace("?", "DATE(t.created_at) = ?");
      sqlTicketsReservationParams[0] = req.query.date;
    }
    const ticketsReservation = await db.query(sqlTicketsReservation, sqlTicketsReservationParams);
    res.status(200).send({
      state: "success",
      data: ticketsReservation,
    });
  } catch (err) {
    res.status(400).send({
      state: "failure",
      message: err
    });
  }
};

const createTicketValidator = function (data) {
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
  return validate(data, schema);
};

const getTicketsByUserValidator = function (data) {
  const schema = {
    fullname: {
      presence: true,
      length: {
        minimum: 2,
        maximum: 512,
      },
    },
    ticketType: {
      length: {
        maximum: 32,
      },
    },
    date: {
      format: {
        message: "must be format YYYY-MM-DD",
        pattern: /^(\d){4,5}-(\d){2}-(\d){2}$/,
      },
    },
  };
  return validate(data, schema);
};
