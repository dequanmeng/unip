var express = require('express');
var app = express();
var path = require('path');
const fileUpload = require('express-fileupload');
var server = require('http').createServer(app);
var port = process.env.PORT || 4000;
const mongoose =require('mongoose');
const bodyParser=require("body-parser");
const cors=require("cors");
const {auth} =require('./middleware/auth.js') ;
require('dotenv/config');
const io = require('socket.io')(server, {
  cors: {
    origin: '*',
  }
});
const mkdirp = require('mkdirp')
const fs = require('fs');
//----------------------------------------------------------------








server.listen(port, () => {
  console.log('Server listening at port %d', port);
});
// //broker
// require('./broker')(io);
// import route
const usersRoute=require("./routes/user")
const gatesRoute=require("./routes/gate")
const loginRoute=require("./routes/login")


// db connection
mongoose.connect('mongodb://localhost/unip', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
mongoose.connection.once('open',()=>{


    console.log('connected to mongodb sucssesfully');
    
}).on('error',(error)=>{
 console.log(error);
 
})


// Routing
//app.use(express.static(path.join(__dirname, 'public')));
const whitelist=['http://localhost:3000','http://127.0.0.1:5500/']
var corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}
app.use(cors(corsOptions))
//app.use(express.json())
app.use(bodyParser.json());
app.use(fileUpload());
//broker
require('./broker')(io);
app.use("/login",loginRoute);
app.post("/",(req,res)=>{
  res.send("welcome to smartcity")
  
  
  })
app.get("/",(req,res)=>{
res.json({"message":"welcome to smartcity"})
})
app.use(auth);
// app.use("/signup",signupRoute);
app.use("/users",usersRoute);
app.use("/gates",gatesRoute);
// app.use("/cells",cellsRoute);
// app.use("/devices",devicesRoute);

app.use('/upload',express.static('public'))
app.post('/upload', (req, res) => {
  if (req.files === null) {
    return res.status(400).json({ msg: 'No file uploaded' });
  }
 
                                                         
  const file = req.files.file;

  file.mv(`${__dirname}/public/files/${file.name}`, err => {
    if (err) {
      console.error(err);
      return res.status(500).send(err);
    }

    res.json({ fileName: file.name, filePath: `http://localhost:4000/upload/${file.name}` });
  });

})


app.get("/upload/:name",(req,res)=>{
  let filePath = path.resolve(`./public/files/groups/${req.params.name}`)
  fs.readdir(filePath, (err, file) => {
   // files.forEach(file => {
      let fpath= path.resolve(`./public/files/groups/${req.params.name}/${file}`)
      res.sendFile(fpath)
   // });
  });
  //res.download(filePath)
 // res.json(req.params.name)
  
  })


      



