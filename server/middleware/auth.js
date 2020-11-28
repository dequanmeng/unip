const jwt =require('jsonwebtoken');
require('dotenv/config');

const JWT_SECRET  = process.env.JWT_SECRET;

const auth=(req, res, next) => {
  const token = req.header('x-auth-token');
  var ip =
  req.headers['x-forwarded-for'] || 
  req.connection.remoteAddress || 
  req.socket.remoteAddress ||
  (req.connection.socket ? req.connection.socket.remoteAddress : null);
  // Check for token
  if (!token)
    return res.status(401).json({ msg: 'No token, authorizaton denied' });

  try {
    // Verify token
    const decoded = jwt.verify(token, JWT_SECRET);
    // Add user from payload
    
    req.user = decoded;
    if(decoded.ip==ip)
    next();
    else{
     
      res.status(400).json({ msg: 'XSS detected :(' });
    }
  } catch (e) {
    console.log(JWT_SECRET );
    res.status(400).json({ msg: 'Token is not valid',err:e });
  }
};

module.exports={auth}