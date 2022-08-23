const Pool = require("pg").Pool;

const pool = new Pool({
  user: "postgres",
  password: "jam$0705",
  host: "localhost",
  port: "5432",
  database: "students",
});

module.exports = pool;
