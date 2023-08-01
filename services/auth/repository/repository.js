  const  client = require('../../../utils/initializer');
 
  
  
  //* seve Information USER in database


  async function saveUser(inputData){

  try {
console.log(inputData);
let insertQuery =`insert into users1(id, username, password,insert_date)
   values(${5},'${inputData.username}','${inputData.password}',${inputData.insertDate})`
   console.log(insertQuery);
   const result = await client.query(insertQuery);

   const user = result.rows[0];
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'internal server error'})
client.end()
  }
 }
 

// //* get user for databases

const findUser = async(inputData) =>{ 
  try {
 
    const user = ({username: inputData.username})
    console.log('66666666666 :>> ', user);
    if(!user){
      throw{
        massage:'user not found',
        status:404

      }
    }
    console.log('3333333333333333333333333 :>> ', `SELECT username FROM users1 WHERE username = ${inputData.username}`);
    client.query(`SELECT username FROM users1 WHERE username = ${inputData.username}`, (err,result)=>{
      if(err) console.log('1111111111111 :>> ', err);
      else{
        console.log('22222222222222 :>> ', result);
      }
    })
  } catch (err) {
    let statusCode = err.status || 400;
    throw{
      status: statusCode,
    }
  }
}

   module.exports =  {saveUser, findUser}






   































