const userModel=require('../models/user.models');
const userService=require('../services/user.service');
const { validationResult } = require('express-validator');

module.exports.registerUser=async(req, res,ext)=>{
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }
    const {fullname,email,password}=req.body;
    const hashPassword=await userModel.hashPassword(password);
    console.log(req.body);
    const user = await userService.createUser({
        firstname: fullname.firstname,
        lastname: fullname.lastname,
        email,
        password: hashPassword
    });

    const token=user.generateAuthToken();
    res.status(201).json({token,user});


}