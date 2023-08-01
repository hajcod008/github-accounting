
const uuid = require('uuid');
const { schema } = require('../../../models/secure/uservalidasion');
const {validate } =require('../../../utils/validator');
const bcrypt = require('bcryptjs');
const repository = require('../repository/repository');
const genrate = require('../../../utils/generate')
//const { checkAccess } =require('../../../utils/accessControl');
const { config } = require('dotenv');

//*register user
  async function register(req, res){
    try {
        const {body} = req;
        console.log('22222222222222 :>> ',body); 
        await validate(body,schema);
        const inputData = {
            id: uuid.v4(),
            fullname: body.fullname,
            username: body.username,
            password: body.password,
            insertDate:Date.now() 
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
    await repository.saveUser(inputData);
    delete inputData._id;
    return {
        message: 'اطلاعات با موفقیت ثبت شد',
        result: inputData
    }
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
       
        const userData = await repository.findUser({username: inputData.username});
        if (!userData) {
            throw{
                message:'کاربر مورد نظر یافت نشد',
                status: 404
            }
        }
        const ispasswordcorrect = await bcrypt.compare(inputData.password,userData.password);
        if(ispasswordcorrect) {
           // const accessToken = generate.access(userData.id);
          return{
            status:200,
            data: {
                message:'خوش امدید',
                result: {
            
                    userData,
                   // accessToken
                }

            }

          }  
        }else{
            throw{
                message:'پسورد یا ایمیل تان نادرست است',
                status:400
            }
        }
    } catch (err) {
        const status = err.status || 400;
        res.status(status).send({
            status:'fail',
            data: err.data
        })
    }
}

module.exports = { login, register};