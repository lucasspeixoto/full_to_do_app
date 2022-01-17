const TaskModel = require("../models/task");
const {
  startOfDay,
  endOfDay,
  startOfWeek,
  endOfWeek,
  startOfMonth,
  endOfMonth,
  startOfYear,
  endOfYear,
} = require("date-fns");
const current = new Date();

class TaskController {
  async getAllTasks(req, res) {
    await TaskModel.find({ macaddress: { $in: req.params.macaddress } })
      .sort("when")
      .then((response) => {
        res.status(200).json(response);
      })
      .catch(() => {
        const error = new HttpError(
          "Algo deu errado na listagem das tarefas, tente novamente.",
          500
        );
        throw error;
      });
  }

  async create(req, res) {
    const task = new TaskModel(req.body);

    await task
      .save()
      .then((response) => {
        res.status(201).json({message: 'Tarefa Cadastrada com sucesso!'});
      })
      .catch(() => {
        const error = new HttpError(
          "Algo deu errado na criação desta tarefa, tente novamente.",
          500
        );
        throw error;
      });
  }

  async update(req, res) {
    const taskUpdated = req.body;
    const taskId = req.params.id;

    await TaskModel.findOneAndUpdate({ _id: taskId }, taskUpdated, {
      new: true,
      useFindAndModify: false,
    })
      .then((response) => {
        return res.status(200).json(response);
      })
      .catch(() => {
        const error = new HttpError(
          "Algo deu errado na edição desta tarefa, tente novamente.",
          500
        );
        throw error;
      });
  }

  async getTaskById(req, res) {
    const taskId = req.params.id;

    await TaskModel.findById(taskId)
      .then((response) => {
        if (response) {
          return res.status(200).json(response);
        } else {
          return res.status(404).json({ error: "Tarefa não encontrada" });
        }
      })
      .catch(() => {
        const error = new HttpError(
          "Algo deu errado na seleção desta tarefa, tente novamente.",
          500
        );
        throw error;
      });
  }

  async deleteTaskById(req, res) {
    const taskId = req.params.id;

    await TaskModel.deleteOne({ _id: taskId })
      .then((response) => {
        return res.status(200).json(response);
      })
      .catch(() => {
        const error = new HttpError(
          "Algo deu errado ao tentar deletar esta tarefa, tente novamente.",
          500
        );
        throw error;
      });
  }

  async updateTaskStatus(req, res) {
    const { id: taskId, done } = req.params;

    await TaskModel.findByIdAndUpdate(
      { _id: taskId },
      { done: done },
      { new: true, useFindAndModify: false }
    )
      .then((response) => {
        return res.status(200).json(response);
      })
      .catch(() => {
        const error = new HttpError(
          "Algo deu errado ao tentar atualizar o status desta tarefa, tente novamente.",
          500
        );
        throw error;
      });
  }

  async getAllLateTasks(req, res) {
    await TaskModel.find({
      when: { $lt: current },
      macaddress: { $in: req.params.macaddress },
    })
      .sort("when")
      .then((response) => {
        return res.status(200).json(response);
      })
      .catch(() => {
        const error = new HttpError(
          "Algo deu errado ao tentar listar as tarefas atrasadas, tente novamente.",
          500
        );
        throw error;
      });
  }

  async getAllTodayTasks(req, res) {
    await TaskModel.find({
      macaddress: { $in: req.params.macaddress },
      when: { $gte: startOfDay(current), $lte: endOfDay(current) },
    })
      .sort("when")
      .then((response) => {
        return res.status(200).json(response);
      })
      .catch((err) => {
        return res.status(500).json({
          error:
            "Algo deu errado ao tentar listar as tarefas de hoje, tente novamente.",
        });
      });
  }

  async getAllWeekTasks(req, res) {
    await TaskModel.find({
      macaddress: { $in: req.params.macaddress },
      when: { $gte: startOfWeek(current), $lte: endOfWeek(current) },
    })
      .sort("when")
      .then((response) => {
        return res.status(200).json(response);
      })
      .catch(() => {
        const error = new HttpError(
          "Algo deu errado ao tentar listar as tarefas desta semana, tente novamente.",
          500
        );
        throw error;
      });
  }

  async getAllMonthTasks(req, res) {
    await TaskModel.find({
      macaddress: { $in: req.params.macaddress },
      when: { $gte: startOfMonth(current), $lte: endOfMonth(current) },
    })
      .sort("when")
      .then((response) => {
        return res.status(200).json(response);
      })
      .catch(() => {
        const error = new HttpError(
          "Algo deu errado ao tentar listar as tarefas deste mês, tente novamente.",
          500
        );
        throw error;
      });
  }

  async getAllYearTasks(req, res) {
    await TaskModel.find({
      macaddress: { $in: req.params.macaddress },
      when: { $gte: startOfYear(current), $lte: endOfYear(current) },
    })
      .sort("when")
      .then((response) => {
        return res.status(200).json(response);
      })
      .catch(() => {
        const error = new HttpError(
          "Algo deu errado ao tentar listar as tarefas do ano, tente novamente.",
          500
        );
        throw error;
      });
  }
}

module.exports = new TaskController();
