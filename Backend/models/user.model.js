const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    fullname: {
        firstname :{
            type: String,
            required: true,
            minlength: [3, 'First name must be atleast 3 characters long']
        },
        lasttname :{
            type: String,
            minlength: [3, 'Last name must be atleast 3 characters long']
        },
    },
    email: {
        type: String,
        required: true,
        unique: true,
        minlength: [5, 'Email should be atleast 5 characters long']
    },
    password: {   // we will use jwt authentication for passwords
        type: String,
        required: true,
        select: false,
    },
    socketId: {   // socketid will be used for tracking the driver / captain
        type: String,
    },
})


//creating some METHODS on the userSchema
userSchema.methods.generateAuthToken = function() {                //generateAuthToken
    const token = jwt.sign({_id: this._id}, process.env.JWT_SECRET, {expiresIn: '24h'});
    return token;
}

userSchema.methods.comparePassword = async function(password) {      //comparePassword
    return await bcrypt.compare(password, this.password);
}

userSchema.statics.hashPassword = async function(password) {           //hashPassword
    return await bcrypt.hash(password, 10);
}

// creating user model
const userModel = mongoose.model('user', userSchema);

module.exports = userModel;

//now we will REQUIRE this user model in CONTROLLERS