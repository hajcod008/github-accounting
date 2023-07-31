const bl = require('../businesslogic/bl');
const uuid = require('uuid');
const { registerSchema, loginSchema } = require('../../../utils/schema');
const {validate } =require('../../../utils/validator');
const bcrypt = require('bcryptjs');
const repository = require('../../../utils/initializer');
//const { checkAccess } =require('../../../utils/accessControl');
const { config } = require('dotenv');

//*register user
  async function register(req, res){
    try {
        const {body} = req;
        await validate(body,registerSchema);
        const inputData = {
            id: uuid.v4(),
            username: body.username,
            password: body.password,
            insertDate:Date.now() 
        }
        const result = await bl.register(inputData);
        console.log('7777777777777777 :>> ',inputData);
        res.send(result);
    } catch (err) {
        console.log(err);
        err.status = err.status || 500;
        res.status(err.status).send({
            error: err.error || { message:'مشکلی برای سرور رخ داده است لطفا بهدا مراجعه فرمایید '}
        });

    }
  }



//*login user

async function login(req, res) {
    try {
        const inputData = {
            username: req.body.username,
            password: req.body.password  
        }
        await validate(inputData, loginSchema)
        console.log('44444444444444444 :>> ', req.body);
        let result = await bl.login(inputData);
        console.log('555555555555 :>> ',inputData);
        res.status(200).send(result);
    } catch (err) {
        const status = err.status || 400;
        res.status(status).send({
            status:'fail',
            data: err.data
        })
    }
}

module.exports = { login, register};