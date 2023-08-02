
const uuid = require('uuid');
const { schema } = require('../model/secure/uservalidation');
require('../model/users')
const { validate } = require('../model/secure/validator');
const bcrypt = require('bcryptjs');
const repository = require('../controller/repository');
const genrate = require('../utils/generate')
const { client } = require('../config/connDB')
//const { checkAccess } =require('../../../utils/accessControl');
const { config } = require('dotenv');

//*register user
async function register(req, res) {
    try {
        const { body } = req;
        console.log('22222222222222 :>> ', body);
        await validate(body, schema);
        const inputData = {
            id: uuid.v4(),
            fullname: body.fullname,
            username: body.username,
            password: body.password,
            insertDate: Date.now()

        }
        console.log('333333333333333 :>> ', inputData);
        //     const user = await repository.findUser({ username: inputData.username });
        //     console.log('44444444444444 :>> ', user);  
        // if (!user) {
        //     throw {
        //         status: 409,
        //         data: {
        //             message: 'این کاربر در پایگاه داده موجود است لطفا لاگین بنمایید'
        //         }
        //     }
        // }
        inputData.password = await bcrypt.hash(inputData.password, 10);
        await repository.saveUser(inputData, res);

        delete inputData._id;

        res.send({
            message: 'اطلاعات با موفقیت ثبت شد',
            result: inputData
        })

    } catch (err) {
        console.log(err);
        err.status = err.status || 500;
        res.status(err.status).send({
            error: err.error || { message: 'مشکلی برای سرور رخ داده است لطفا بعدا مراجعه فرمایید ' }
        });

    }
}



//*login user

async function login(req, res) {
    // let result = ''
    // let p=''

    try {

        const inputData = {
            id: req.id,
            fullname: req.fullname,
            username: req.body.username,
            password: req.body.password
        }
        console.log(inputData.username)
        // await validate(inputData, schema)
        const loginuser = async () => {
            try {
                const query1 = `SELECT password FROM users WHERE username = '${inputData.username}'`;
                console.log(query1);
                const result = await client.query(query1);
                console.log('done select');
                const pass = result.rows[0].password ;
                console.log(pass)
    
            } catch (error) {
                console.error('Error while selecting password:', error);
            }
        }
        // console.log(result.rows[0].password)
        console.log(inputData.password)
        const l= loginuser()
        
        // console.log(pass)
        // const userData = await repository.findUser({ username: inputData.username });
        // if (!pass) {
        //     res.send( {
        //         message: 'کاربر مورد نظر یافت نشد',
        //         status: 404
        //     })
            
        // }
        
        const ispasswordcorrect = await bcrypt.compare(inputData.password,pass);
        if (ispasswordcorrect) {
            // const accessToken = generate.access(userData.id);
            res.send( {
                status: 200,
                data: {
                    message: 'خوش امدید',
                    result: {

                        userData,
                        // accessToken
                    }

                }

            })
        } else {
            res.send( {
                message: 'پسورد یا ایمیل تان نادرست است',
                status: 400
            })
        }
    } catch (err) {
        const status = err.status || 400;
        res.status(status).send({
            status: 'fail',
            data: err.data
        })
    }
}

module.exports = { login, register };