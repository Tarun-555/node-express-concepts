const { Pool } = require("pg");
require("dotenv").config();

// console.log("Connecting to PostgreSQL database...", process.env.POSTGRES_URL);

// const pool = new Pool({
//   connectionString: process.env.POSTGRES_URL,
// });

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
  // ssl: {
  //   rejectUnauthorized: false,
  // },
});

module.exports = { pool };
