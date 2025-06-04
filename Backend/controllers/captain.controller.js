const blacklistTokenModel = require('../models/blacklistToken.model');
const captainModel = require('../models/captain.model');
const captainService = require('../services/captain.service');
const {validationResult} = require('express-validator');

module.exports.registerCaptain = async(req, res, next) => {
    //data which is coming is valid or not
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    }

    const {fullname, email, password, vehicle} = req.body; 

    //with this email, aready a captain is registered or not, we will check
    const isCaptainAlreadyExist = await captainModel.findOne({email});
    if(isCaptainAlreadyExist){
        return res.status(400).json({message: 'Captain already exist'});
    }

    const hashedPassword = await captainModel.hashPassword(password);

    //from captainService, creating captain and vehicle
    const captain = await captainService.createCaptain({
        firstname: fullname.firstname,
        lastname: fullname.lastname,
        email,
        password: hashedPassword,
        color: vehicle.color,
        plate: vehicle.plate,
        capacity: vehicle.capacity,
        vehicleType: vehicle.vehicleType
    });
    //token generated
    const token = captain.generateAuthToken();
    res.status(201).json({token, captain});
}


//logout
module.exports.loginCaptain = async(req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }

    const {email, password} = req.body;
    const captain = await captainModel.findOne({email}).select('+password');
    if(!captain){
        return res.status(401).json({message: 'Invalid email or password'});
    }
    //if captain found then compare password
    const isMatch = await captain.comparePassword(password);
    //if password does not matches
    if(!isMatch){
        return res.status(401).json({message: 'Invalid email or password'});
    }
    //and if password matches then generate token
    const token = captain.generateAuthToken();

    res.cookie('token', token);
    res.status(200).json({token, captain});
}


module.exports.getCaptainProfile = async(req, res, next) => {
    res.status(200).json({captain: req.captain});
}

module.exports.logoutCaptain = async (req, res, next) => {
    //got token
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
    //then blacklist the token
    await blacklistTokenModel.create({token}); 
    //then clear the cookie
    res.clearCookie('token');
    //and then logged out successfully
    res.status(200).json({message: 'Logout successfully'});
}