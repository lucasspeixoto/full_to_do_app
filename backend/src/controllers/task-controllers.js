const HttpError = require("../models/http-error");
const TaskModel = require("../models/task");

class TaskController {
  async create(req, res, next) {
    const task = new TaskModel(req.body);

    await task
      .save()
      .then((response) => {
        res.status(201).json(response);
      })
      .catch((err) => {
        const error = new HttpError(
          "Algo deu errado na criação desta tarefa, tente novamente.",
          500
        );
        return next(error);
      });
  }
}

module.exports = new TaskController();
