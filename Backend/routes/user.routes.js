const express = require('express');
const router = express.Router(); 
const { body } = require("express-validator");
const userController = require('../controllers/user.controller');

//whatever data will come on this register , we will validate using express validator
router.post('/register', [
    body('email').isEmail().withMessage('Invalid Email'),
    body('fullname.firstname').isLength({min: 3}).withMessage('First name must be 3 characters long'),
    body('password').isLength({min: 6}).withMessage('Password should be atleast 6 characters long')
], userController.registerUser)



module.exports = router;