const validate = require("validate.js");

exports.createTicket = function (req, res) {
  let inputErrors;
  try {
    inputErrors = createTicketValidator(req);
    if (inputErrors) {
      throw "Invalid input";
    }
    // console.log(createTicketValidator(req));
    //   res.json(createTicketValidator(req));
    // db.query(`
    //     INSERT INTO my_guests (guest_name)
    //     VALUES ("${req.body.name}");
    // `, function (err, rows, fields) {
    //         if (err) throw err
    //         res.status(200).send({
    //             "state": "success",
    //             "message": rows
    //         })
    //     }
    // );
    res.json("success");
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
        greaterThan: 0
      }
    }
  };
  return validate(req.body, schema);
};
