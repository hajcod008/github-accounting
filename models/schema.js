const { client } = require('../config/initializer');

const creatusert = async () => {
  try {
    const query = `
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        fullname VARCHAR(100) NOT NULL,
        username VARCHAR(100) NOT NULL UNIQUE,
        password VARCHAR(100) NOT NULL
      )
    `;
    await client.query(query);
    console.log('Table created successfully');
  } catch (error) {
    console.error('Error while creating table:', error);
  }
};

creatusert();