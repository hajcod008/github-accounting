const jwt = require("jsonwebtoken");

const access = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN,
    });
};


module.exports = { access};