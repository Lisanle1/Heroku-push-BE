const mongo= require('../connect')
const bcrypt= require ("bcrypt")
const jwt= require ("jsonwebtoken")
exports.signup=async(req,res,next)=>{ 
//Email id validation
try{
    const existUser=await mongo.selectedDb.collection("users").findOne({email:req.body.email});
    if(existUser){
        return res.send({
            statusCode:400,
            msg:"You are already a registered user"
        })
    }
    
    //conform password checking
    const isSamePassword = checkPassword(req.body.password, req.body.confirmPassword);
    if(!isSamePassword){
        return res.send({
            statusCode:400,
            msg:"password doesn't match"
        })
    }
    else { 
    delete req.body.confirmPassword;
}
    // password Hashing and also return promise
    const ramdomString= await bcrypt.genSalt(10);
    req.body.password = await bcrypt.hash(req.body.password,ramdomString);

    //save in db
    const insertedResponse= await mongo.selectedDb.collection("users").insertOne({...req.body});
    res.send(insertedResponse);
}
catch {
    res.send({
        statusCode:500,
        msg:"Internal server error"
    })
}
}
const checkPassword =(password,confirmPassword)=>{
    return password !== confirmPassword ? false : true;
}
exports.signin=async(req,res,next)=>{
    // req.body : Email and password

    // Email.validation : You  are not a register user. pls signup to register
    try{
        const existUser=await mongo.selectedDb.collection("users").findOne({email:req.body.email});
        if(!existUser){
            return res.send({
                statusCode:400,
                msg:"You  are not a register user. pls signup to register"
            })
        }
    
     //password: Incorrect password 
    const isSamePassword = await bcrypt.compare(req.body.password, existUser.password);
    if(!isSamePassword){
    return res.send({
        statusCode:400,
        msg:"Incorrect Password"
    })
    }
        // Generate and send token as a response and token is an encrypted form of existing user
        const token =jwt.sign(existUser,process.env.SECRET_KEY,{expiresIn:"1hr"});
        res.send(token)
        }
    
    catch {
        res.send({
            statusCode:500,
            msg:"Internal server error"
        })
    }
}
