const mongoose =require("mongoose");
const Gate=require("../models/gate")


const validateKey = (req, res, next) => {

    let api_key = req.header('x-api-key'); 
    Gate.find({apiKey:api_key}, (err, gate) => {
        if (err) {
          // handle error
          console.log("[Error]:middleware.apikey");
          res.status(500).send({ error: { code: 500, message: 'server error' } });
          return;
        }
        if (gate.length) {
          
        //   res.status(200).send("welcome")
          next();
        } else {
            res.status(403).send({ error: { code: 403, message: 'You not allowed.' } });
        }
      });
    // find() returns an object or undefined

  };
  
  module.exports = {  validateKey };