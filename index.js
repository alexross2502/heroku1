const express = require("express");
const app = express();
const PORT = process.env.PORT || 3306;
const cors = require("cors");
const sequelize = require("./db");
const models = require("./models/models");
const router = require("./routes/index");
const errorHandler = require("./middleware/ErrorHandlingMiddleware");

app.use(cors({
  origin: "*"
}))
var corsOptions = {
  origin: "*",
};
app.post("*", cors(), function (req, res, next) {
  res.json({ msg: "Конфиденциальные данные" });
});

app.get("*", function (req, res, next) {
  console.log(req.protocol)
  console.log(req.hostname)
  if(req.rawHeaders[3] == 'http://localhost:3000') {next()} else res.json({ msg: "Конфиденциальные данные" });
 
});
app.delete("*", cors(), function (req, res, next) {
  res.json({ msg: "Конфиденциальные данные" });
});

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
