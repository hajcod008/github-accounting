const jwt = require('jsonwebtoken');
 const userRepository = require('../services/auth/repository/repository');
  

 const  Client = require('./../utils/initializer');
 //const { promisify } = require('utils');


 async function checkAccess(req, res) {
     if(!req.headers.authorization) {
        throw{
            status:400,
            error: { massage:'توکن ارسال نشده است '}
        };
     }
const authorization = req.headers.authorization.split('bear');
if(authorization.length < 2 ) {
    throw{
        status:400,
        error: { massage: 'Invalid Token'}
    };
}
const token = authorization[1];
if(!token) throw{status:400,error:{ massage: 'Token not provided '}};
let decodedToken;
try {
    decodedToken = jwt.verify(token, process.env.JWT_SECRET);
} catch (e) {
    throw{
    status: 401,
    error: {
        massage: 'Token hasc been expired or invalid token, please login again',
    },
};
}
if ( decodedToken.id === undefined) {
    throw { status: 400, error: {massage:'Token not provided'}};

}
const user = await userRepository.findUser({id: decodedToken.id});
if(!user) {
    throw { 
        status:401,
        error: { massage: 'Token is not valid'}

    };
}
}

 module.exports = {checkAccess}
