const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')


const User = require('../models/userModel');

const protect = asyncHandler (async (req, res, next) => {
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        try {
            //Get token from header
            const token = req.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            if(decoded){
                req.user = await User.findById(decoded.id).select('-password');
                next();
            }
        } catch (error) {
            console.log(error);
        }
    }
    res.status(401)
    throw new Error('Not Authorized')
})

module.exports = {protect};