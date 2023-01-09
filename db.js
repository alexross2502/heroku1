const { Sequelize } = require("sequelize");

module.exports = new Sequelize(
  "sql8589442",
  "sql8589442",
  "WD75nJRT1Z",
  {
    dialect: "mysql",
    host: "sql8.freesqldatabase.com",
    port: "3306",
  },
  {
    ssl: true,
    extra: {
      ssl: {
        rejectUnauthorized: false,
      },
    },
  }
);
