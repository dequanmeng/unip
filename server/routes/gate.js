const express= require("express");
const router=express.Router();
const Gate =require("../models/gate")

const API = require('../middleware/apikey');

const handleErrors=(err)=>{
    // console.log(err.message,err.code);
    
    let errors={name:""}
     // incorrect email

    
    // incorrect password

    if(err.code===11000){
      errors.name="that name is already registered";
      return errors
    }
    
 
if(err.message.includes("Gate validation failed")){
    Object.values(err.errors).forEach(({properties})=>{
       errors[properties.path]=properties.message;
    })
  }
    
    
    return errors;
    
    }












router.get("/",  (req,res) => {
    var ip =
     req.headers['x-forwarded-for'] || 
     req.connection.remoteAddress || 
     req.socket.remoteAddress ||
     (req.connection.socket ? req.connection.socket.remoteAddress : null);
     console.log(req.headers['user-agent']+"\n[ip] ->"+ip);
     
   
    Gate.find({}, (err, gates) => {
        // gates is an array which may be empty for no results
        if (err) {
          // handle error
          console.log("[Error]:route.gate.get");
          
          return;
        }

        /// ()? : ;
        if (gates.length) {
          // there are gate(s)
        
          
          res.json(gates);
        } else {
          // there are no gates
          console.log("[Message]:route.gate.get: No gate found");
          res.json({"Message":" No gate found"})
        }
      });
           
     
})

router.post("/",async(req,res)=>{
let topic;
  
  
  const gate =  new Gate({
  

    name:req.body.name,
    
  
   // data:req.body.data
     
     });

gate.save()
.then(data=>res.json(data))
.catch(err=>{
    console.log("[gate_error] : "+handleErrors(err));
    res.json({message:handleErrors(err)})
})



   
       
  
    });

    router.delete("/:name",(req,res)=>{
        Gate.remove({name:req.params.name},(result)=>{
            res.send(result)
        })
     });






router.get("/:name",(req,res)=>{
  Gate.find({name:req.params.name}, (err, gate) => {
    if (err) {
      // handle error
      console.log("[Error]:route.gate.get(:name)");
      
      return;
    }
    if (gate.length) {
      // there are gate(s)
      res.json(gate);
    } else {
      // there are no gates
      console.log("[Message]:route.gate.get(:name):No gate found by this name");
      res.send("[Message]:route.gate.get(:name):No gate found by this name");
    }
  });
      
})



router.patch("/:name",API.validateKey ,(req,res)=>{
    console.log( "[host]=> "+req.headers.origin);
    console.log(req.params.name);
    console.log(req.body.data);
 
    Gate.update(
        { name: req.params.name}, 
        { $push: { data: req.body.data } }
    ).exec(()=>{
      res.status(200).send({
        data: {
          message: `data updated.`,
        },
      });
    })
});








module.exports = router;