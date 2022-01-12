const HttpError = require("../models/http-error");
const TaskModel = require("../models/task");
const { isPast } = require("date-fns");

class TaskController {
  async create(req, res, next) {
    const task = new TaskModel(req.body);

    //* Verificar se task ja foi criada
    /* let exists;
    if (isPast(new Date(task.when))) {
      return res.status(400).json({ error: "Escolha uma data e hora futura" });
    }
    exists = await TaskModel.findOne({
      when: { $eq: new Date(task.when) },
      macaddress: { $in: task.macaddress },
    });

    if (exists) {
      return res
        .status(400)
        .json({ error: "Já existe uma tarefa nesse dia e horário" });
    } */

    await task
      .save()
      .then((response) => {
        res.status(201).json(response);
      })
      .catch(() => {
        return res.status(500).json({
          error: "Algo deu errado na criação desta tarefa, tente novamente.",
        });
      });
  }

  async update(req, res, next) {
    const taskUpdated = req.body;
    const taskId = req.params.id;

    /* let exists;
    if (taskId) {
      exists = await TaskModel.findOne({
        _id: { $ne: taskId },
        when: { $eq: new Date(taskUpdated.when) },
        macaddress: { $in: taskUpdated.macaddress },
      });
    }

    if (exists) {
      return res
        .status(400)
        .json({ error: "Já existe uma tarefa nesse dia e horário" });
    } */

    await TaskModel.findOneAndUpdate({ _id: taskId }, taskUpdated, {
      new: true,
      useFindAndModify: false,
    })
      .then((response) => {
        return res.status(200).json(response);
      })
      .catch(() => {
        return res.status(500).json({
          error: "Algo deu errado na edição desta tarefa, tente novamente.",
        });
      });
  }
}

module.exports = new TaskController();
