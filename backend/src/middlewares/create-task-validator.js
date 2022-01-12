const { validationResult } = require("express-validator");

const CreateTaskValidation = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const requestErros = errors.errors;
    let message = "";
    requestErros.forEach((error, index) => {
      if (index > 0) {
        message = message + " | " + error.msg;
      } else {
        message = message + error.msg;
      }
    });

    return res.status(422).json({ error: message });
  }
  next();
};

module.exports = CreateTaskValidation;
