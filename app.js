const express = require('express');
const cors = require('cors');
const client = require('./utils/initializer');
const dotenv = require('dotenv').config({ path: __dirname + '/.env' });
const app = express();
const morgan = require('morgan');
const fs = require('fs');
const bodyParser = require('body-parser');
const serviceNames = fs.readdirSync('./services')
app.use(morgan('dev'));
const path =require('path');
app.use(express.json({ limit:'50mb' }));


//*use body parser
app.use(bodyParser.urlencoded({ extended: false }))

//*use cors 
app.use(cors());

//* Management ruter
serviceNames.forEach(serviceName => {
    const service = require(`./services/${serviceName}/routes.js`)

    app.use('/api', service)
});


//*env

if (dotenv.error) {
    throw dotenv.error;
}



//*connect to database
client.connect();




//*run server
const port = process.env.SERVER_PORT || 5000 ;


app.listen(port,() => {
    console.log(`App running on port ${port}`);
    });
console.log('lets goooo');
