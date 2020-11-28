const express= require("express");
const router=express.Router();
const User =require("../models/user")
const jwt=require('jsonwebtoken')
const bcrypt=require("bcrypt");
require('dotenv/config');


router.post("/",async (req,res)=>{
  const {email,password}=req.body;
   // Simple validation
   if (!email || !password) {
      return res.status(400).json({ msg: 'Please enter all fields' });
    }
  
    var ip =
    req.headers['x-forwarded-for'] || 
    req.connection.remoteAddress || 
    req.socket.remoteAddress ||
    (req.connection.socket ? req.connection.socket.remoteAddress : null);






    try {
      // Check for existing user
      const user = await User.findOne({ email });
      if (!user) throw Error('[Error]:route.login.post:User Does not exist');
  
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) throw Error('[Error]:route.login.post:Invalid credentials');
  
      const token = jwt.sign({ id: user._id ,ip}, process.env.JWT_SECRET, { expiresIn: '2d' });
      if (!token) throw Error('[Error]:route.login.post:Couldnt sign the token');
  
      res.status(200).json({
        token,
        user: {
          id: user._id,
          email: user.email
        }
      });
    } catch (e) {
      res.status(400).json({ msg: e.message });
    }

  });


module.exports = router;