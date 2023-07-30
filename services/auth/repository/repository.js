  const  client = require('../../../utils/initializer');
 
  
  
  //* seve Information USER in database


  async function saveUser(inputData){

  try {
console.log(inputData);
let insertQuery =`insert into users1(id, username, password,insert_date)
   values(${4},'${inputData.username}','${inputData.password}',${inputData.insertDate})`
   console.log(insertQuery);
   const result = await client.query(insertQuery);


console.log(result.rows);

console.log(result.rowsCount);
client.end();
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'internal server error'})
client.end()
  }
 }
 

//* get user for database

async function findUser(query) {
  try {
    console.log(query);
      const user =  await client.query(  `SELECT * FROM users1 WHERE = 'username' `,[username]).findOne(query, { projection: { _id: 4 } });
      return user;
  } catch (err) {
      throw {
          status: 400,
          message: err.message,
      }
  }
}

   module.exports =  {saveUser,findUser}























































