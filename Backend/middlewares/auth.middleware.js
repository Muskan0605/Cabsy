const userModel = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


// middleware for -> user is authentic or not
module.exports.authUser = async(req, res, next) => {
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
    
    if(!token){
        return res.status(401).json({message: 'Unauthorized'});
    }

    const isBlacklisted = await userModel.findOne({token: token});
    if(isBlacklisted){
        return res.status(401).json({message: 'Unauthorized'});
    }


    // if token got, now decrypt or decode
    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await userModel.findById(decoded._id);
        req.user = user;
        return next();
    }catch(err){
        return res.status(401).json({message: 'Unauthorized'});
    }
} //now use this authUser middleware in user.routes