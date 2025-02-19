const jwt = require("jsonwebtoken");
const ErrorHandler = require("../utils/errorhandler");
const catchAsyncErrors = require("./catchAsyncErrors");
const User=require("../models/userModel");

exports.isAuthenticatedUser=catchAsyncErrors(async (req, res, next)=>{
    const {token}=req.cookies;
    console.log(token);
    if(!token){
        return next(new ErrorHandler("Please Login to access this resource",401));
    }

    const decodedData=jwt.verify(token,process.env.JWT_SECRET);
    console.log(decodedData.id);
    
    req.user=await User.findById(decodedData.id);
    console.log(req.user);
     next();
});

exports.authorizeRoles=(...roles)=>{
    return (req,res,next)=>{
        if(!roles.includes(req.user.role)){
          return next(new ErrorHandler(
                `Role:${req.user.role} is not allowed to access this resource`,403
            ));
        }
        next();
    };
};