const express = require('express');
const router = express.Router();
const authController = require('../controller/authController');
const {validate} = require('../middleware/validate');
const { registerSchema, loginSchma } = require('../validations/authValidation');

router.post('/register',validate(registerSchema), authController.register);
router.post('/login',validate(loginSchma), authController.login);

module.exports = router;