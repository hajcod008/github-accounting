const yup = require('yup');

const registerSchema = yup.object().shape({
    username: yup.string().max(10).min(5).required('username is required'),
    password: yup.string().max(10).min(4).required('please enter your password because password is required'),
  
});

const loginSchema = yup.object().shape({
    username: yup.string().max(10).min(5).required('please enter your username'),
    password: yup.string().max(10).min(4).required('please enter your password because password is required'),
});

module.exports = {registerSchema,loginSchema }