// const yup = require('yup');

const user = client.connect()
  .then(() => {
    const query = `
      CREATE TABLE users (
        id SERIAL PRIMARY KEY,
        fullname VARCHAR(100) NOT NULL,
        email VARCHAR(100) NOT NULL UNIQUE
        pasword VARCHAR(10) NOT NULL UNIQUE
      );
    `;
    return client.query(query);
  })
  .then(() => console.log('Table created successfully'))
  .catch(err => console.log('Error while creating table:', err))
  .finally(() => client.end());


module.exports = {registerSchema,loginSchema }
// username: yup.string().max(10).min(5).required('username is required'),
    // password: yup.string().max(10).min(4).required('please enter your password because password is required'),
  