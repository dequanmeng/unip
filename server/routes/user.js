const express= require("express");
const router=express.Router();
const User =require("../models/user");
require('dotenv/config');
const jwt=require('jsonwebtoken')
const bcrypt=require("bcrypt");
const mongoose =require('mongoose')
const API =require('../middleware/adminauth')
//--------------------------------------------------------------------
const handleErrors=(err)=>{


let errors={email:"",password:"",lastName:"",firstName:"",lastName:"",phoneNumber:""}


if(err.code===11000){
  
  if(err.keyValue["email"])
  errors.email="that email is already registered";
  if(err.keyValue["phoneNumber"])
  errors.password="that phoneNumber is already registered";
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
//     expiresIn:'3d'
//   })
// }
//-------------------------------------------------------------------------------------------

//-------------------------------------------------------------------------------------------
router.get('/currentuser',async(req,res)=>{
  const user=await (await User.findOne({_id:req.user.id},'-password').populate('creatures gates','_id'))
    if(user){
      res.json({user})
    }else{
      res.json({errors:'errors!'})
    }
})
  


//-------------------------------------------------------------------------------------------
router.get("/",  (req,res) => {
   
    User.find({},'-password', (err, users) => {
        // users is an array which may be empty for no results
        if (err) {
          // handle error
          console.log("[Error]:routes.user.get");
          
          return;
        }
        if (users.length) {
          // there are user(s)
          // var ip =
          // req.headers['x-forwarded-for'] || 
          // req.connection.remoteAddress || 
          // req.socket.remoteAddress ||
          // (req.connection.socket ? req.connection.socket.remoteAddress : null);
          res.json(users);
        } else {
          // there are no users
          console.log("[Message]:No users found");
          
          
          
          res.json({"messege":"No users found"});
          
         
        }
      });
           
     
    router.patch("/resetpassword",API.adminauth,async(req,res)=>{
      User.findOne({_id:req.body.id}, function(err, doc) {
        if (err) {
          const errors=handleErrors(err) 
          console.log('--------');
          console.log(err);
          res.json({ errors})
          return
        }
        doc.password = req.body.password;
        doc.save().then(data=>{
             res.json({msg:'password successfully changed'})
        }).catch(err=>{
            const errors=handleErrors(err) 
            console.log(err);
              res.json({ errors})
          })
      })
      // user.password=
      // user.save().then(data=>{
        //const token=createToken(data._id)
       // res.cookie('log',token,{httpOnly:true,maxAge:maxAge*1000})
       
       
      //  res.status(201).json({msg:'password successfully changed'})})
      // .catch(err=>{
      //   const errors=handleErrors(err) 
      //     res.json({ errors})
      // })



      // User.updateOne({_id:req.body.id}, {password:req.body.password},(err,result)=>{
      //   if(!err){
      //     console.log(result);
      //    res.json({msg:'password successfully changed'})
      //   }else{
      //     const errors=handleErrors(err) 
      //     res.json({ errors})
      //   }
      // })

    })



    router.patch("/",API.adminauth,async(req,res)=>{
      const cdata=[] 
      // const udata={}
      // const vdata=[]
      console.log('---user---');
      console.log(req.user);
     
      const cid=req.body.id
      var query=null
     await User.find({_id:req.body.id},(err, users) => {

        if (err) {
         
          console.log("[Error]:routes.user.get");
          
          return;
        }
        if (users.length) {
          
          users=users[0]
          console.log(users);
          query=req.body;
          delete query['id']
          delete query['password']
       
          for(var key in query){
          
            if(users[key]==query[key] ){
              //  cdata.push(String(key))
              //  vdata.push(String(query[key]))
              //  udata[key]=String(query[key])
              //  console.log(key,udata,cdata,vdata);
              console.log(key);
               delete query[key]
       
              }else{
                cdata.push(String(key))
              }
              
        }
   
           
          // res.json(users);
        } else {
        
            
          res.json({"messege":"No users found"});
          
         
        }


       })
      //  if ()
          console.log(mongoose.Types.ObjectId(req.body.id));
          console.log(req.body.id);
          console.log(cid);
          console.log(query);
      User.updateOne({_id:cid}, query,(err,result)=>{
        if(!err){

         res.json({cdata,result})
        }else{
          const errors=handleErrors(err) 
          res.json({ errors})
        }
      })
        // User.findOneAndUpdate({_id:req.body.id}, update, callback)
       })
        
   
       
  
    


})

router.post("/",(req,res)=>{
  console.log('------body--------');
        console.log(req.body.firstName);
        console.log(req.body.lastName);
        console.log(req.body.phoneNumber);
        // console.log(req.body.isAdmin);
        console.log(req.body.email);
        console.log(req.body.password)
       const user = new User({
          //  userName:req.body.userName,
           creator:req.user.id,
           firstName:req.body.firstName,
           lastName:req.body.lastName,
           phoneNumber:req.body.phoneNumber,
           email:req.body.email,
           password:req.body.password,
           isAdmin:req.body.isAdmin,
      
       });
       user.save()
       .then(data=>{
         //const token=createToken(data._id)
        // res.cookie('log',token,{httpOnly:true,maxAge:maxAge*1000})
        
        
        res.status(201).json({user:data._id})})
       .catch(err=>{
         console.log('-----------')
         console.log(err)
         console.log('-----------')
      
        const errors= handleErrors(err);
           console.log("[Error] :route.user.post:"+errors);
           res.status(400).json({errors})
       })
  
    });
router.delete("/",API.adminauth,(req,res)=>{
  console.log(req.body.id);
  User.deleteOne({_id:req.body.id},(result)=>{
    console.log(result);
    res.json({msg:'user successfully deleted'})
})
})

module.exports = router;