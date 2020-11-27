const mongoose = require('mongoose');
const {isEmail} =require ("validator")
const bcrypt=require("bcrypt");

const userSchema =  new mongoose.Schema({
  
    // firstName:{ type : String , required : true },
    // lastName:{ type : String , required : true },
    // userName:{type : String , unique : true  ,required : true},
    email: { 
        type : String , 
        unique : true  ,
        required :[ true , "please enter an Email"],
        lowercase:true,
        trim: true,
        validate:[isEmail,"please insert valid Email"]
    },
    password:{type:String,required:[ true , "please enter an Password"],minlength:[ 8 , "minimum password length is 8 charecter"]}

   

    // isActive:{}
    
    // phoneNumber:{ type : String  ,required : true},
   
  
    // ipAddress:[{}],
    // dashboard:[{}]
    // BirthDay:{ type : Date , }
    
    // roles : [{ type : Schema.Types.ObjectId , ref : 'Role'}],
    // img:{}
    // isActivated: {type: Boolean, default: false},


} , { timestamps : true , toJSON : { virtuals : true } });



userSchema.pre('save',async function (next){
    const salt=await bcrypt.genSalt();
    this.password=await  bcrypt.hash(this.password,salt);
    next();
})

// userSchema.statics.login = async function(email,password){
//     const user = await this.findOne({ email });
//     if (!user) {throw Error('User Does not exist');
// console.log('user not exist');

// }

//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch){
//         throw Error('Invalid credentials');
//         console.log('password not match');
//     } 
//     else{
//         return user
//     }

// }




module.exports = mongoose.model('User' , userSchema);

