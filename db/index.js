const Pool = require("pg").Pool;

//insures that the .env file is only run in a development environment and not a production environment
if (process.env.NODE_ENV !== "production") {
  //requires the the .env file configuration be run first hiding all info hidden via the .env file
  require("dotenv").config();
}

const pool = new Pool({
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  host: process.env.PGHOST,
  port: process.env.PGPORT,
  database: process.env.PGDATABASE,
  max: 20,
  connectionTimeoutMillis: 0,
  idleTimeoutMillis: 0,
});

module.exports = {
  query: (text, params) => {
    return pool.query(text, params);
  },
};
