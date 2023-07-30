const { Client } = require('pg');
require('dotenv').config();
// const bcrypt = require('bcryptjs');

    
 const client = new Client({
         user: process.env.DB_USER,
     host: process.env.DB_HOST,
     database: process.env.DB_NAME,
     password: process.env.DB_PASSWORD,
     port: process.env.DB_PORT,
   });
client.on('connect',()=>{
    console.log('Database connection');
})
client.on('end',() =>{
    console.log('connction end');
})
module.exports = client;