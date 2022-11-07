const jwt= require ('jsonwebtoken');

// Authentication
exports.authenticationUser=(req,res,next)=>{
    // check whether access token exists in headers
    if(!req.headers.accesstoken){
            return res.send({
                statusCode:400,
                msg:"Token not found"
            })
    }
    // verify token (decrypt the token using jwt.verify)
    try {
    const user = jwt.verify(req.headers.accesstoken, process.env.SECRET_KEY);
    req.body.currentuser=user; //user set the user details req.body.currentuser
    next();
    }
    catch { 
        res.send({
            statusCode:400,
            msg:"Unauthorised"
        })
    }
};

// Authorization
exports.authorizedUser=(req,res,next)=>{
    if(req.body.currentuser.role==='admin'){
        next();
    }
    else {
        return res.send({
            statusCode:404,
            msg:"Forbidden : No permission to access the API"
        })
    }
}