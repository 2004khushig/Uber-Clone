const userModel=require('../models/user.models');
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');
const blackListTokenModel=require('../models/blacklistToken.model');
const captainModel=require('../models/captain.model');

module.exports.authUser = (req, res, next) => {
    const token = req.headers.authorization;

    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }

    try {
        const tokenValue = token.split(' ')[1]; // Extract actual token
        console.log("🔍 Received Token:", tokenValue);

        const decoded = jwt.verify(tokenValue, process.env.JWT_SECRET);
        req.user_id = decoded._id; // Ensure correct field name
        

        next();
    } catch (error) {
        return res.status(401).json({ message: 'Invalid token' });
    }
};




module.exports.authCaptain=async(req,res,next)=>{
    const token=req.cookies.token || req.headers.authorization?.split(' ')[1];


    if(!token){
        return res.status(401).json({message:'Unauthorized'});
    }
    const isBlacklisted=await blackListTokenModel.findOne({token:token});
    if(isBlacklisted){
        return res.status(401).json({message:'Unauthorized'});
    }
    try{
        const decoded=jwt.verify(token,process.env.JWT_SECRET);
        const captain=await captainModel.findById(decoded._id);
        req.captain=captain;
        return next();
    }
    catch(err){
        res.status(401).json({message:'Unauthorized'});
    }
}