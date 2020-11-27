const express= require("express");
const router=express.Router();
const User =require("../models/user")
// const jwt=require('jsonwebtoken')
// require('dotenv/config');
//--------------------------------------------------------------------
const handleErrors=(err)=>{
// console.log(err.message,err.code);

let errors={email:"",password:""}
 // incorrect email
 if (err.message === 'incorrect email') {
  errors.email = 'That email is not registered';
}

// incorrect password
if (err.message === 'incorrect password') {
  errors.password = 'That password is incorrect';
}
if(err.code===11000){
  errors.email="that email is already registered";
  return errors
}

if(err.message.includes("User validation failed")){
  Object.values(err.errors).forEach(({properties})=>{
     errors[properties.path]=properties.message;
  })
}


return errors;

}
//-----------------------------------------------------------------------------
// const maxAge= 3*24*60*60;
// const createToken=(id)=>{
//   return jwt.sign({id},process.env.JWT_SECRET,{
//     expiresIn:maxAge
//   })
// }

//-------------------------------------------------------------------------------------------
router.get("/",  (req,res) => {
   
    User.find({}, (err, users) => {
        // users is an array which may be empty for no results
        if (err) {
          // handle error
          console.log("[Error]:routes.user.get");
          
          return;
        }
        if (users.length) {
          // there are user(s)
          var ip =
          req.headers['x-forwarded-for'] || 
          req.connection.remoteAddress || 
          req.socket.remoteAddress ||
          (req.connection.socket ? req.connection.socket.remoteAddress : null);
          res.json({users,ip});
        } else {
          // there are no users
          console.log("[Message]:No users found");
          
          
          
          res.json({"messege":"No users found"});
          
         
        }
      });
           
     
       
        
   
       
  
    


})

router.post("/",(req,res)=>{
       const user = new User({
          //  userName:req.body.userName,
           email:req.body.email,
           password:req.body.password
       });
       user.save()
       .then(data=>{
         //const token=createToken(data._id)
        // res.cookie('log',token,{httpOnly:true,maxAge:maxAge*1000})
        
        
        res.status(201).json({user:data._id})})
       .catch(err=>{
        const errors= handleErrors(err);
           console.log("[Error] :route.user.post:"+errors);
           res.status(400).json({errors})
       })
  
    });
router.delete("/",(req,res)=>{
  User.deleteOne({email:req.body.email},(result)=>{
    res.send("[delete]: "+result)
})
})

module.exports = router;