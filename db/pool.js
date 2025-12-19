const { Pool } = require("pg");
require("dotenv").config();

module.exports = new Pool({
  connectionString: process.env.RENDER_URL || process.env.DATABASE_URL,
  ssl: process.env.RENDER_URL ? true : false
});