const { client } = require('../config/connDB');

const creatusert = async () => {
  try {
    
    const query = `
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        fullname VARCHAR(200) NOT NULL,
        username VARCHAR(100) NOT NULL UNIQUE,
        password VARCHAR(100) NOT NULL,
        insert_date BIGINT NOT NULL
      )
      
    `;
    await client.query(query);
    console.log('Table created successfully');
  } catch (error) {
    console.error('Error while creating table:', error);
  }
};

creatusert();