const express = require('express');
const router = express.Router();
const authController = require('../controller/authController');
const validate = require('../middlewares/validate');
const { registerSchema } = require('../validations/authValidation');

router.post('/register',validate(registerSchema), authController.register);
router.post('/login',validate(registerSchema), authController.login);

module.exports = router;