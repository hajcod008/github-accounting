const {client} = require ('../config/initializer')

client.connect()

.then(() => {

    const query = `

      CREATE TABLE IF NOT EXISTS users (

        id SERIAL PRIMARY KEY,

        fullname VARCHAR(100) NOT NULL,

        email VARCHAR(100) NOT NULL UNIQUE,

        password VARCHAR(10) NOT NULL UNIQUE

      );
    `;

    return client.query(query);

  })

  .then(() => console.log('Table created successfully'))

  .catch(err => console.log('Error while creating table:', err))
  
  .finally(() => client.end());

  