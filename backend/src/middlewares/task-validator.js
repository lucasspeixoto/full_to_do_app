const { validationResult } = require("express-validator");
const { isPast } = require("date-fns");
const HttpError = require("../models/http-error");
const TaskModel = require("../models/task");

const TaskValidation = async (req, res, next) => {
  const { macaddress, when } = req.body;

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

  //* Caso esteja atualizando uma Tarefas
  if (req.params.id) {
    exists = await TaskModel.findOne({
      _id: { $ne: req.params.id },
      when: { $eq: new Date(when) },
      macaddress: { $in: macaddress },
    });
    //* Caso esteja criando uma tarefa
  } else {
    if (isPast(new Date(when))) {
      const error = new HttpError(
        "Uma Tarefa deve ter data de entrega futura!",
        400
      );
      return next(error);
    }
    exists = await TaskModel.findOne({
      when: { $eq: new Date(when) },
      macaddress: { $in: macaddress },
    });
  }

  if (exists) {
    const error = new HttpError(
      "Já existe uma tarefa nesse dia e horário.",
      400
    );
    return next(error);
  }

  next();
};

module.exports = TaskValidation;
