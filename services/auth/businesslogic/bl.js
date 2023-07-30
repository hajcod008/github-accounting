const repository = require('../repository/repository');
const genrate = require('../../../utils/generate');
const bcrypt = require('bcryptjs');
const { query } = require('express');

//*hash password 

async function register(inputData){
    const user = await repository.findUser({ username: inputData.username });
    if (user) {
        throw {
            status: 409,
            data: {
                message: 'این کاربر در پایگاه داده موجود است لطفا لاگین بنمایید'
            }
        }
    }
    inputData.password = await bcrypt.hash(inputData.password, 10);
    await repository.saveUser(inputData);
    delete inputData._id;
    return {
        message: 'اطلاعات با موفقیت ثبت شد',
        result: inputData
    }

}
//* Comparison username and password and token
const login = async(inputData) => {
    try {
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
        let statusCode = err.status || 400;
        throw{
            status: statusCode,
            data: {
                message: err.message,
            }
        }
        
    }
}



module.exports = {
    register,
    login
}