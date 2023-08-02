const { client } = require('../config/connDB');

const uuid = require('uuid');



//* seve Information USER in database


async function saveUser(inputData , res) {

  try {
    console.log(inputData);
  
    const query = `insert into 
    users(id,fullname, username, password,insert_date)
    values(${112},'${inputData.fullname}','${inputData.username}','${inputData.password}',${inputData.insertDate})`
    await client.query(query);
    
    client.end();
    console.log('user insert successfully');
    
    
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'internal server error' })

  }
}


//* get user for database

async function findUser(query) {
  try {
    console.log(query);
    const user = await client.query(`SELECT * FROM users WHERE = 'username' `, [username]).findOne(query, { projection: { _id: 4 } });
    return user;
  } catch (err) {
    throw {
      status: 400,
      message: err.message,
    }
  }
}

module.exports = { saveUser, findUser }
