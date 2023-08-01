const { Client } = require('pg');

const dotEnv = require("dotenv");

dotEnv.config({ path: "./config/config.env" });

const config = {

    user: process.env.DB_USER,

    host: process.env.DB_HOST,

    database: process.env.DB_NAME,

    password: process.env.DB_PASSWORD,

    port: process.env.DB_PORT,

};

const client = new Client(config);

client.connect()
  .then(() => {
    console.log('Connected to database');
  })
  .catch(err => {
    console.error('Error connecting to database', err.stack);
  });

module.exports = {

  client,
};