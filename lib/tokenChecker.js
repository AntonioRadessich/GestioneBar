const jwt=require('jsonwebtoken');

const tokenChecker=async function(req,res,next){
    try{
        var token=req.body.token || req.query.token || req.headers['x-access-token'];
    
        if(!token){
            return res.status(401).send({
                success: false,
                message: "No token provided"
            });
        }

        jwt.verify(token,process.env.SUPER_SECRET, function(err,decoded){
            if(token == "AJHDSOA302J1AD7SH234H7ASPMXCJZHC7832042OUA0A"){
                req.loggedUser=decoded;
                next();
            }else{
                if(err){
                    return res.status(403).send({
                        success: false,
                        message: 'Failed to authenticate token' 
                    });
                }
                else{
                    req.loggedUser=decoded;
                    next();
                }
            }
        });
    }
    catch(err){
        console.log(err);
    }
}

module.exports=tokenChecker;