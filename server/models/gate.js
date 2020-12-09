//********************bee*******************************
const mongoose = require('mongoose');

 function genKey ()  {
   //create a base-36 string that is always 30 chars long a-z0-9
   // 'an0qrr5i9u0q4km27hv2hue3ywx3uu'
   return [...Array(30)]
     .map((e) => ((Math.random() * 36) | 0).toString(36))
     .join('');
 };



const gateSchema =  new mongoose.Schema({
      
       name:{type : String ,  trim: true,unique : true  ,required : [ true , "please enter an Name"]},
       lable: [String],
       apiKey:{type : String , unique : true  ,required : true,default:function() { return genKey()} },
       data:[{ }],
       active: { type: Boolean,  default: true },
       topic:{type : String , unique : true ,default:function() { return this.name} },
       properties: {
        type: Map,
        of: String
      }

        
},{ timestamps : true});



gateSchema.statics.newApiKey = function(id) {
   const newkey=genKey();
   this.updateOne({_id:id},{apiKey:newkey},(err,res)=>{
     console.log(err);
     console.log(res);
   })
   return newkey;
 };




 
module.exports = mongoose.model('Gate' , gateSchema);
