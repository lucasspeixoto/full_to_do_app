const fs = require("fs");
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const { mongoUrl } = require("./config/envs");

const HttpError = require("./models/http-error");

const TaskRoutes = require("./routes/task-routes");

const app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  next();
});

app.use("/task", TaskRoutes);

//Middleware que só é chamado caso não obtenha resposta do middleware anterior ( quando der erro em '/api/places')
app.use((req, res, next) => {
  const error = new HttpError("Não foi possível encontrar está rota.", 404);
  throw error;
});

app.use((error, req, res, next) => {
  if (req.file) {
    fs.unlink(req.file.path, (err) => {
      console.log(err);
    });
  }
  if (res.headerSent) {
    return next(error);
  }

  res.status(error.code || 500);
  res.json({ message: error.message || "Um erro desconhecido ocorreu!" });
});

mongoose
  .connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    app.listen(5000, () => {
      console.log("Connected");
    });
  })
  .catch((error) => {
    console.log(`Connection Error: ${error}`);
  });
