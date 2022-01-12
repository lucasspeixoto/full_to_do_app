const express = require("express");
const { check } = require("express-validator");
const { isPast } = require("date-fns");
const TaskModel = require("../models/task");
const TaskController = require("../controllers/task-controllers");
const TaskValidation = require("../middlewares/create-task-validator");

const Checkers = [
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

router.post("/", Checkers, TaskValidation, TaskController.create);

router.put("/:id", Checkers, TaskValidation, TaskController.update);

module.exports = router;
