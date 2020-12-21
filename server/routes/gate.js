const express= require("express");
const router=express.Router();
const Gate =require("../models/gate")
const GAPI = require('../middleware/gateauth');
const API = require('../middleware/apikey');
const moment = require('moment')


//================
function groupBy(list, keyGetter) {
  const map = new Map();
  list.forEach((item) => {
       const key = keyGetter(item);
       const collection = map.get(key);
       if (!collection) {
           map.set(key, [item]);
       } else {
           collection.push(item);
       }
  });
  return map;
}

//===============
getGreetingTime = (currentTime) => {
  if (!currentTime || !currentTime.isValid()) { return ; }

  const splitAfternoon = 12; // 24hr time to split the afternoon
  const splitEvening = 17; // 24hr time to split the evening
  const currentHour = parseFloat(currentTime.format('HH'));

  if (currentHour >= splitAfternoon && currentHour <= splitEvening) {
    // Between 12 PM and 5PM
    return 'afternoon';
  } else if (currentHour >= splitEvening) {
    // Between 5PM and Midnight
    return 'evening';
  }
  // Between dawn and noon
  return 'morning';
}


//==================

const handleErrors=(err)=>{
    // console.log(err.message,err.code);
    
    let errors={name:"",topic:""}
     // incorrect email

    
    // incorrect password

    if(err.code===11000){
      if(err.keyValue["name"])
      errors.name="that name is already registered";
      if(err.keyValue["topic"])
      errors.topic="that name (topic) is already registered";
     
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
  
    creator:req.user.id,
    name:req.body.name,
    
  
   // data:req.body.data
     
     });

gate.save()
.then(data=>res.json({gate:data}))
.catch(err=>{
    console.log("[gate_error] : "+handleErrors(err));
    res.json({errors:handleErrors(err)})
})



   
       
  
    });

    router.delete("/",GAPI.gateauth,(req,res)=>{
      console.log(req.body.id);
      Gate.deleteOne({_id:req.body.id},(result)=>{
        console.log(result);
        res.json({msg:'gate successfully deleted'})
    })
    })


router.get("/data/:id",(req,res)=>{
  var ins=[]
  var out=[]
  var range=[]
  var total=0
  Gate.find({'data.user':req.params.id},"data",(err, gate) => {
    if (err) {
      // handle error
      console.log("[Error]:route.gate.data(:id)");
      
      return;
    }
   
    gate.map(item=>{
     
      // console.log('ins',item.data.filter(dt=>dt.user==req.params.id && dt.staus==true));
       ins.push(...item.data.filter(dt=>dt.user==req.params.id&&dt.status==true))
      //  console.log('out',item.data.filter(dt=>dt.user==req.params.id && dt.staus==true));
       out.push(...item.data.filter(dt=>dt.user==req.params.id&&dt.status==false))
       return

    })
    for( var i=0;i<out.length;i++){
      
      range.push([ins[i].time,out[i].time])
      total+=moment(out[i].time).diff(ins[i].time)

    }
    var fdata= range.map(item=>{
      var t=getGreetingTime(moment(item[0]))
      return {
         x:t,
         y:[new Date(item[0]).getTime(),new Date(item[1]).getTime()]
         ,fillColor:t=='morning' ?'#94e3cd':t=='afternoon'?'#77a7ab':'var(--color-green)'
      }
  })
    // res.json({ins,out,inslen:ins.length,outlen:out.length});
    res.json({fdata,total})
  })

})




router.get("/data/today/:name/:status",(req,res)=>{
  const today = moment().startOf('day')

  // Gate.find({
  //   createdAt: {
  //     $gte: today.toDate(),
  //     $lte: moment(today).endOf('day').toDate()
  //   }
  // })
  Gate.findOne({name:String(req.params.name)},"data",(err, gate) => {
    if (err) {
      // handle error
      console.log("[Error]:route.gate.get(:name)");
      
      return;
    }
    var len=gate.data.length;
    if (len) {
      // there are gate(s)
      var todaydata= gate.data.filter(data=>moment(data.time).toDate()<moment(today).endOf('day').toDate()&&moment(data.time).toDate()>today.toDate())
      
      
      if(req.params.status==1)
      //outside
      todaydata=todaydata.filter(data=>data.status==false)
      else if(req.params.status==2)
      //inside
      todaydata=todaydata.filter(data=>data.status==true)
      else if(req.params.status==3){
      //between
      var temp=[]
      // todaydata.map(data=>{
      //   temp[data.user]
      //   temp[data.user].push({status:data.status,time:data.time})
      //   return
      // })
      const grouped = groupBy(todaydata, data => data.user);
      grouped.forEach(item=>{
      
        console.log(item.length);
        if (item.length%2!=0){
          temp.push(item[item.length-1])
        }

      })
      console.log(temp);
      todaydata=temp
    }
    console.log("td",todaydata);
      res.json({data:todaydata,count:todaydata.length});
    } else {
      // there are no gates
      console.log("[Message]:route.gate.get(:name):No gate found by this name");
      res.json({errors:'No data to display'});
    }
  });
      
})


router.patch("/",GAPI.gateauth,async(req,res)=>{
  const cdata='name'

  const cid=req.body.id

  if(req.body.name){
  Gate.updateOne({_id:cid}, {name:req.body.name},(err,result)=>{
    if(!err){

     res.json({cdata,result})
    }else{
      console.log(err);
      const errors=handleErrors(err) 
      res.json({ errors})
    }
  })
}else{
  
  res.json({ errors:{name:'please enter an Name'}})

}
   })



   router.patch("/resetapi",GAPI.gateauth,async(req,res)=>{
 
  
    const cid=req.body.id
    const newApi=Gate.newApiKey(cid)
    res.json({newApi})
      
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