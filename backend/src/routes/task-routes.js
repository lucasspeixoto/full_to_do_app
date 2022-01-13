const express = require("express");
const { check } = require("express-validator");

const TaskController = require("../controllers/task-controllers");
const TaskValidation = require("../middlewares/task-validator");

const checkers = [
  check("macaddress")
    .not()
    .isEmpty()
    .withMessage("O macaddress é um campo obrigatório."),
  check("type")
    .not()
    .isEmpty()
    .withMessage("O tipo é um campo obrigatório.")
    .matches(/\d/)
    .withMessage("O Campo tipo é numérico."),
  check("title")
    .not()
    .isEmpty()
    .withMessage("O Título é um campo obrigatório.")
    .isLength({ min: 3 })
    .withMessage("O Título precisa possuir no mínimo 3 caracteres."),
  check("description")
    .not()
    .isEmpty()
    .withMessage("A Descrição é um campo obrigatório.")
    .isLength({ min: 5 })
    .withMessage("A Descrição precisa possuir no mínimo 5 caracteres."),
  check("when")
    .not()
    .isEmpty()
    .withMessage("A Data de limite para uma tarefa é um campo obrigatório."),
];

const router = express.Router();

router.post("/", checkers, TaskValidation, TaskController.create);
router.put("/:id", checkers, TaskValidation, TaskController.update);
router.get("/:id", TaskController.getTaskById);
router.delete("/:id", TaskController.deleteTaskById);
router.put("/:id/:done", TaskController.updateTaskStatus);

router.get("/filter/mytasks/:macaddress", TaskController.getAllTasks);
router.get("/filter/late/:macaddress", TaskController.getAllLateTasks);
router.get("/filter/today/:macaddress", TaskController.getAllTodayTasks);
router.get("/filter/week/:macaddress", TaskController.getAllWeekTasks);
router.get("/filter/month/:macaddress", TaskController.getAllMonthTasks);
router.get("/filter/year/:macaddress", TaskController.getAllYearTasks);

module.exports = router;
