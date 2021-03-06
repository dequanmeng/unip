const mongoose = require('mongoose');
const {isEmail} =require ("validator")
const bcrypt=require("bcrypt");

const userSchema =  new mongoose.Schema({
    creator:{ type : mongoose.Schema.Types.ObjectId , ref : 'User'},
    email: { 
        type : String , 
        
        
        lowercase:true,
        required :[ true , "please enter an Email"],
        unique : true  ,
        trim: true,
        validate:[isEmail,"please insert valid Email"]
    },
    firstName:{  trim: true,type : String , required : [ true , "please enter firtName"] },
    lastName:{  trim: true,type : String , required : [ true , "please enter lastName"] },
    // userName:{type : String , unique : true  ,required : true},

    password:{type:String,required:[ true , "please enter an Password"],minlength:[ 8 , "minimum password length is 8 charecter"]},

    //isActivated: {type: Boolean, default: false},
    isInside: {type: Boolean, default: false, set: blnsetter},
    phoneNumber:{ unique:true,type : String  ,required : [ true , "please enter phoneNumber"]},
    // img:{type : String },
    department:{ trim: true,type : String },
    // ipAddress:[{}],
    // dashboard:[{ type : Schema.Types.ObjectId , ref : 'Gate'}],
    // BirthDay:{ type : Date , }
    isAdmin:{type: Boolean, default: false, set: blnsetter},
    // isManager:{type: Boolean, default: false}
    // roles : [{ type : Schema.Types.ObjectId , ref : 'Role'}],
    // isActivated: {type: Boolean, default: false},
    //current token :for xss double check or refresh in logout should be null

} , { timestamps : true, toJSON : { virtuals : true }  });


function blnsetter(v){
  return (v)?true:false;
}
userSchema.pre('save',async function (next){
    console.log(this.password)
    const salt=await bcrypt.genSalt();
    this.password=await  bcrypt.hash(this.password,salt);
    console.log(this.password);
    next();
})
// userSchema.statics.toggleInside=async function(id){
//   var data=await this.findOne({_id:id},'isInside ')
//   // console.log(data.isInside);
// await this.findOneAndUpdate({_id:id},{isInside:!data.isInside},(err,res)=>{
// if(err){
//   return false;
// }
// return res
// })
  

 


// }

  userSchema.virtual('creatures' , {
    ref : 'User',
    localField : '_id',
    foreignField : 'creator'
  })
  userSchema.virtual('gates' , {
    ref : 'Gate',
    localField : '_id',
    foreignField : 'creator'
  })



module.exports = mongoose.model('User' , userSchema);

