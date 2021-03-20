const jwt = require("jsonwebtoken");

exports.checkCurrentUser = (req,res,next) => {
  // Access authorization from req header
  const Authorization = req.header("authorization");
  if(!Authorization) {
    req.user = null;
    return next();    
  }

  try {
    const token = Authorization.replace("Bearer ","");
    const { userId } = jwt.verify(token, process.env.APP_SECRET);
    req.user = { userId };
  } catch (error) {
    req.user = null;
  }

  next();
}
