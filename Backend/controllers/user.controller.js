// ROUTES will be created but its logic will be WRITTEN in CONTROLLERS
const userModel = require('../models/user.model');
const userService = require('../services/user.service');
const {validationResult} = require('express-validator');
const jwt = require('jsonwebtoken');
const blacklistTokenModel = require('../models/blacklistToken.model');


//register
module.exports.registerUser = async (req, res, next) => {
    //after validation from user routes , we perform further actions in the user controllers
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({ erros: errors.array()});
    }

    const {fullname, email, password} = req.body;
    //check with this email, a user already exist or not
    const isUserAlreadyExist = await userModel.findOne({email});
    if(isUserAlreadyExist){
        return res.status(400).json({message: 'User already exist'});
    }

    const hashedPassword = await userModel.hashPassword(password);
    //register particular user
    const user = await userService.createUser({
        firstname: fullname.firstname,
        lastname: fullname.lastname,
        email,
        password: hashedPassword
    });
    const token = user.generateAuthToken()
    res.status(201).json({token, user}); 
}



//login particular user
module.exports.loginUser = async(req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }

    const {email, password} = req.body;
    // we will check that with this email, any particular user exist or not & 
    //to also check whether the paswword given by user is correct or not
    const user = await userModel.findOne({email}).select('+password');
    if(!user){
        return res.status(401).json({message: 'Invalid email or password'});
    }
    
    const isMatch = await user.comparePassword(password);
    if(!isMatch){
        return res.status(401).json({message: 'Invalid email or password'});
    }

    //after checking everything we will generate token and also user will be sended as response

    const token = user.generateAuthToken();
    res.cookie('token', token);
    res.status(200).json({token, user});
}


//profile of the user
module.exports.getUserProfile = async(req, res, next) => {
    res.status(200).json(req.user);
}

//logout user
module.exports.logoutUser = async (req, res, next) => {
    res.clearCookie('token');
    const token = req.cookies.token || req.headers.authorization.split(' ')[1];
    await blacklistTokenModel.create({token});
    res.status(200).json({message: 'Logged out'});
}