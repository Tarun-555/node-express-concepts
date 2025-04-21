const { Pool } = require("pg");
require("dotenv").config();

console.log("Connecting to PostgreSQL database...", process.env.POSTGRES_URL);

const pool = new Pool({
  connectionString: process.env.POSTGRES_URL,
});

module.exports = { pool };
