const { validationResult } = require("express-validator");

const { isPast } = require("date-fns");

const TaskModel = require("../models/task");

const TaskValidation = async (req, res, next) => {
  const { macaddress, type, title, description, when } = req.body;
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
    if (isPast(new Date(when)))
      return res.status(400).json({ error: "Uma Tarefa deve ter data de entrega futura!" });
    exists = await TaskModel.findOne({
      when: { $eq: new Date(when) },
      macaddress: { $in: macaddress },
    });
  }

  if (exists) {
    return res
      .status(400)
      .json({ error: "já existe uma tarefa nesse dia e horário" });
  }

  next();
};

module.exports = TaskValidation;
