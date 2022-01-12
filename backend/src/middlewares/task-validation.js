const { isPast } = require("date-fns");
const TaskModel = require("../models/task");

const TaskValidation = async (req, res, next) => {
  const { macaddress, type, title, description, when } = req.body;

  if (!macaddress)
    return res.status(422).json({ error: "macaddress é um campo obrigatório" });
  else if (!type)
    return res.status(422).json({ error: "tipo é um campo obrigatório" });
  else if (!title)
    return res.status(422).json({ error: "título é um campo obrigatório" });
  else if (!description)
    return res.status(422).json({ error: "descrição é um campo obrigatório" });
  else if (!when)
    return res.status(422).json({ error: "data é um campo obrigatório" });
  else if (isPast(new Date(when)))
  return res.status(422).json({ error: "A Data de limite para uma tarefa é um campo obrigatório" });
};

module.exports = TaskValidation;
