const express = require("express");
const app = express();
const PORT = process.env.PORT || 3306;
const cors = require("cors");
const sequelize = require("./db");
const models = require("./models/models");
const router = require("./routes/index");
const errorHandler = require("./middleware/ErrorHandlingMiddleware");

app.use(
  cors({
    origin: "*",
  })
);
/*
app.get("*", function (req, res, next) {
  console.log(req.header("Origin"));
  if (req.header("Origin") == "https://test-app22334455.herokuapp.com") {
    next();
  } else res.json({ msg: "Конфиденциальные данные" });
});

app.post("*", function (req, res, next) {
  console.log(req.header("Origin"));
  if (req.header("Origin") == "https://test-app22334455.herokuapp.com") {
    next();
  } else res.json({ msg: "Конфиденциальные данные" });
});

app.delete("*", function (req, res, next) {
  if (req.header("Origin") == "https://test-app22334455.herokuapp.com") {
    next();
  } else res.json({ msg: "Конфиденциальные данные" });
});
*/
app.use(express.json());
app.use("/api", router);
//обработка ошибок, последний middleware
app.use(errorHandler);
app.get("/", (req, res) => {
  res.status(200).json({ message: "working" });
});
const start = async () => {
  try {
    console.log(sequelize);
    await sequelize.authenticate();
    await sequelize.sync();
    app.listen(PORT, () => console.log("start", PORT));
  } catch (e) {
    console.log(e);
  }
};
start();
