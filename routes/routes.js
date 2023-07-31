const { Router } = require('express');
const router = Router();

const { login, register } = require('../services/auth/controller/controller');
 
router.get('/login', login);
router.post('/register', register);


module.exports = router;