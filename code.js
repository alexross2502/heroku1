const mysql = require("mysql");
//heroku_2b0e3dfcc2c4171  name
///Username:	b09c520b17b183
//Password:	ea20a555 (Reset)
//mysql://b09c520b17b183:ea20a555@eu-cdbr-west-03.cleardb.net/heroku_2b0e3dfcc2c4171?reconnect=true

const con = mysql.createConnection({
  host: "eu-cdbr-west-03.cleardb.net",
  user: "b09c520b17b183",
  password: "ea20a555",
  database: "heroku_2b0e3dfcc2c4171",
});

con.connect(function (err) {
  if (err) throw err;
  console.log("connect");
});
