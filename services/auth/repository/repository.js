  const  {client} = require('../../../config/initializer');
 
  
  
  //* seve Information USER in database


  async function saveUser(inputData){

  try {
console.log(inputData);
let insertQuery = async ()=> {
  try {
    const query =`insert into 
    users(id,fullname, username, password,insert_date)
    values(${4},'${inputData.fullname}','${inputData.username}','${inputData.password}',${inputData.insertDate})`
    await client.query(query);
    console.log('user insert successfully');
  
  } catch (err) {
    console.error('Error while iserting user:', err);
  }
}

insertQuery();
  //  console.log(insertQuery);
  //  const result = await client.query(insertQuery);


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
      const user =  await client.query(  `SELECT * FROM users WHERE = 'username' `,[username]).findOne(query, { projection: { _id: 4 } });
      return user;
  } catch (err) {
      throw {
          status: 400,
          message: err.message,
      }
  }
}

   module.exports =  {saveUser,findUser}























































