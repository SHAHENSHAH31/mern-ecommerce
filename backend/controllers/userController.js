const ErrorHandler = require('../utils/errorhandler');
const catchAsyncErrors=require('../middleware/catchAsyncErrors');
const User= require("../models/userModel");
const sendToken = require('../utils/jwtToken');
const sendEmail=require('../utils/sendEmail');
const cloudinary = require("cloudinary");
const crypto=require('crypto');
//register a user

exports.registerUser=catchAsyncErrors(async(req,res,next)=>{
console.log("hi")
  const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
    folder: "avatars",
    width: 150,
    crop: "scale",
  });
  console.log("hi")
    const {name,email,password}=req.body;             
    const user=await User.create({
        name,email,password,
        avatar: {
          public_id: myCloud.public_id,
          url: myCloud.secure_url,
        },
    });

  sendToken(user,200,res);
})

// LOGIN A USER
 exports.loginUser=catchAsyncErrors(async (req,res,next)=>{
    const {email,password}=req.body;

    // checking if user has given password and email both
    console.log(email,password);

    if(!email || !password){
        return next(new ErrorHandler("Please Enter Email & Password",400))
    }

     const user=await User.findOne({email}).select("+password");
     console.log(user);

     if(!user){
        return next(new ErrorHandler("Invalid email or password",401))
     }
    
     const isPasswordMatched= await user.comparePassword(password) ;
     console.log(isPasswordMatched);

     if(!isPasswordMatched){
        return next(new ErrorHandler("Invalid email or password",401))
     }

   sendToken(user,200,res);
 });

 // logout user

 exports.logout=catchAsyncErrors(async(req,res,next)=>{
  res.cookie("token",null,{
    expires:new Date(Date.now()),
    httpOnly:true,
  })

  res.status(200).json({
    success:true,
    message:"Logged Out",
  });
 });

 // forgot password

 exports.forgotPassword=catchAsyncErrors(async (req,res,next)=>{
  const user=await User.findOne({email:req.body.email});
  if(!user){
    return next(new ErrorHandler("User not found",404));
  }
  // get resetpassword token
  const resetToken=user.getResetPasswordToken();
  await user.save({validateBeforeSave:false});
  const resetPasswordUrl=`${process.env.FRONTEND_URL}/password/reset/${resetToken}`;
  const message=`Your password reset token is :- \n\n ${resetPasswordUrl} \n\nIf you have not requested this email then please ignore it`;
  try{
     await sendEmail({
      email:user.email,
      subject:`Ecommerce Password Recovery`,
      message,
     })
     res.status(200).json({
      success:true,
      message:`Email sent to ${user.email} successfully`,
     })
  }catch(error){
     user.resetPasswordToken=undefined;
     user.resetPasswordExpire=undefined;
     await user.save({validateBeforeSave:false});
     return next(new ErrorHandler(error.message,500));
  }

 });

 // reset password

 exports.resetPassword=catchAsyncErrors(async (req,res,next)=>{
  // create token hash
  console.log(req.body.password,req.body.confirmPassword,)
  const resetPasswordToken=crypto.createHash("sha256").update(req.params.token).digest("hex");

  const user =await User.findOne({
    resetPasswordToken,
    resetPasswordExpire:{$gt:Date.now()},
  });

  if(!user){
    return next (new ErrorHandler("Reset Password Token is invalid or has been expired",400));
  }

  if(req.body.password!==req.body.confirmPassword){
    return next(new ErrorHandler("Password dose not match with confirmPassword",400));
  }

  user.password=req.body.password;
  user.resetPasswordToken=undefined;
  user.resetPasswordExpire=undefined;

  await user.save();

  sendToken(user,200,res);

 });

 //get user detail
 exports.getUserDetails=catchAsyncErrors( async (req,res,next)=>{
  const user=await User.findById(req.user.id);

  res.status(200).json({
    success:true,
    user,
  });
 });

 //update user password
 exports.updatePassword=catchAsyncErrors( async (req,res,next)=>{
  const user=await User.findById(req.user.id).select("+password");

  const isPasswordMatched= user.comparePassword(req.body.oldPassword) ;

  if(!isPasswordMatched){
     return next(new ErrorHandler("Old password is incorrect",401))
  }

  if(req.body.newPassword!==req.body.confirmPassword){
    return next(new ErrorHandler("Password does not match",400));
  }

  user.password=req.body.newPassword;

  await user.save();

  sendToken(user,200,res);
 
 });

 //update user profile
 exports.updateProfile=catchAsyncErrors( async (req,res,next)=>{
  const newUserData={
    name:req.body.name,
    email:req.body.email,
  };
  
  if (req.body.avatar !== "") {
    const user = await User.findById(req.user.id);

    const imageId = user.avatar.public_id;

    await cloudinary.v2.uploader.destroy(imageId);

    const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
      folder: "avatars",
      width: 150,
      crop: "scale",
    });

    newUserData.avatar = {
      public_id: myCloud.public_id,
      url: myCloud.secure_url,
    };
  }

  const user=await User.findByIdAndUpdate(req.user.id,newUserData,{
    new:true,
    runValidators:true,
    userFindAndModify:false,
  });

  res.status(200).json({
    success:true,
  });
 
 });

 // get all user admin
 exports.getAllUser= catchAsyncErrors(async (req,res,next)=>{
  const users=await User.find();

  res.status(200).json({
    success:true,
    users,
  });
 });

 // get single user admin
 exports.getSingleUser= catchAsyncErrors(async (req,res,next)=>{
  const user=await User.findById(req.params.id);
  if(!user){
   return next(new ErrorHandler(`User does not exist with Id:${req.params.id}`))
  }
  res.status(200).json({
    success:true,
    user,
  });
 });

 //update user role admim
 exports.updateUserRole=catchAsyncErrors(async (req,res,next)=>{
  const newUserData={
    name:req.body.name,
    email:req.body.email,
    role:req.body.role,
  }
  
  const user= await User.findByIdAndUpdate(req.params.id,newUserData,{
    new:true,
    runValidators:true,
    userFindAndModify:false,
  });
  res.status(200).json({
    success:true,
    user
  })
 })

 // delete user -- Admin
 exports.deleteUser= catchAsyncErrors(async (req,res,next)=>{
  const user=await User.findById(req.params.id);
  if(!user){
   return next(new ErrorHandler(`User does not exist with Id:${req.params.id}`))
  }
  const imageId = user.avatar.public_id;

  await cloudinary.v2.uploader.destroy(imageId);
  await User.findByIdAndDelete(req.params.id);
  res.status(200).json({
    success:true,
    message: "User Deleted Successfully",
  });
 });

