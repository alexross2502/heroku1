const express = require("express");
const app = express();
//app.use(express.static(path.join(__dirname, "src")));
app.get("/", (req, res) => {
  console.log("123141");
});

const start = async () => {
  try {
    app.listen(8000, () => console.log("start", 8000));
  } catch (e) {
    console.log(e);
  }
};
start();
