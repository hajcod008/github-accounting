const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path =require('path');
const dotEnv = require("dotenv");
const morgan = require('morgan');
const fs = require('fs');
const app = express();

const serviceNames = fs.readdirSync('./controller')
const client = require('./config/connDB');
dotEnv.config({ path: "./config/config.env" });
require('./model/users')


app.use(morgan('dev'));

app.use(express.json({ limit:'50mb' }));


//*use body parser
app.use(bodyParser.urlencoded({ extended: false }))

//*use cors 
app.use(cors());

//* Management ruter
serviceNames.forEach(serviceName => {
    const service = require(`./routes/routes`)

    app.use('/api', service)
});


//*env

// if (dotenv.error) {
//     throw dotenv.error;
// }



//*connect to database
// client.connect();




//*run server
const port = process.env.SERVER_PORT || 5000 ;


app.listen(port,() => {
    console.log(`App running on port ${port}`);
    });
console.log('lets goooo');
