
require('dotenv/config');
const mongoose =require("mongoose");

const User =require("../models/user");

const adminauth=async(req, res, next) => {
 
  var ip =
  req.headers['x-forwarded-for'] || 
  req.connection.remoteAddress || 
  req.socket.remoteAddress ||
  (req.connection.socket ? req.connection.socket.remoteAddress : null);
  // Check for token
  // if (!token)
  //   return res.status(401).json({ msg: 'No token, authorizaton denied' });

  try {
 
   const user=await User.findOne({_id:req.user.id},'-password').populate('creatures','_id')
  var child=[]
  
  const be=String(user)

   await user.creatures.map(c=>{
     child.push(String(c._id))
   })

  
  
   if (user._id==req.body.id || be.search('isSuperAdmin')!=-1 || child.includes(req.body.id) ){
          next()
   }else{
     console.log('Access denied!')
     res.status(401).json({ errors: 'Access denied!'});
   }

  } catch (err) {
    console.log(err);
    res.status(400).json({ errors:err ,msg:'creator deleted just superadmin  can delete'});
  }
};

module.exports={adminauth}