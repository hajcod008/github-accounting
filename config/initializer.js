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

module.exports = {

  client,
};