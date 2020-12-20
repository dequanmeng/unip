
  
// module.exports = router;
const API=require('./middleware/apikey')
const Gate=require('./models/gate')
const User=require('./models/user')
var moment = require('moment');

// const wrap = middleware => (socket, next) => middleware(socket.request, {}, next);
module.exports = function(io) {
      
        
       
        //const workspaces = io.of(/^\/\w+$/);
        const workspaces = io.of(/(\/\w*#*\w*)+/);
        workspaces.use( (socket, next) => {
       
          const apiKey =  socket.handshake.query.apiKey;
          console.log(apiKey);
          Gate.find({apiKey:apiKey}, (err, gates) => {
            // gates is an array which may be empty for no results
            if (err) {
              // handle error
              console.log("error");
              next(new Error('forbidden'));
              return;
            }
    
            /// ()? : ;
            if (gates.length) {
              // there are gate(s)
              console.log('connected');
              console.log(socket.nsp.name);
              console.log('topic:',gates[0].topic)
               next();
              
             
            } else {
              // there are no gates
              console.log('no gate find by this apikey');
              
              next(new Error('forbidden'));
              
            }
          })


   
       
        });
        workspaces.on('connection', socket => {
 
      // socket.broadcast.emit('hi',`${socket.id} joined `)
        // socket.emit('msg',`...`);
         socket.on('msg',async(msg)=>{
          
        
              //  console.log('----toggle---user---');
              //  console.log(User.toggleInside(msg.data.user)); 
       
              var data=await User.findOne({_id:msg.data.user},'isInside lastName firstName')
              console.log('bef',data.isInside);
              User.findOneAndUpdate({_id:msg.data.user},{isInside:!data.isInside},(err,res)=>{
                  if(err){
                     socket.emit('msg',err);
                  }
                  console.log('res:',res.isInside);
                  var message={
                    topic:msg.topic
                    ,data:
     
                       
                     {lastName:res.lastName,firstName:res.firstName,isInside:!res.isInside,id:res._id}
                   
                      
                     }
                     console.log('--message--');
                     console.log(message.data);
                     
                   socket.broadcast.emit('msg',message)
                   socket.emit('msg',message.data)
                   Gate.updateOne(
                    { topic: msg.topic}, 
                    { $push: { data: {...msg.data ,status:message.data.isInside,lastName:data.lastName,firstName:data.firstName}} },
                    async(err,result)=>{
        
                     if(err){
                       console.log(`data update in gate ${msg.topic} failed`)
                     }else{

                      console.log({...msg.data ,status:message.data.isInside});

                       console.log(`data update in gate ${msg.topic} was successful`);



                     }})


                  })


       
             

             }

         
          )
     
           
         })
    
        

}
