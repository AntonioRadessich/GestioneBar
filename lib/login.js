const express = require('express');
//const app = express();
var db=require('./db.js');
const jwt=require('jsonwebtoken');
const router=express.Router();

router.get('/api/v1', async (req,res) => {
    let user;
    let payload;
    let userCount=0;
    try{
        user=await db.users.all()
        user = user.filter((dbEntry) =>{
            if(req.query.email){
                if(dbEntry.email==req.query.email){
                    userCount++;
                    return true;
                }
                return false;
            }
        })
        .map((dbEntry)=>{
            if(dbEntry.category=='manager'){
                payload = {
                    self: '/api/v1/manager/'+dbEntry.id,
                    email: dbEntry.email,
                    category: "manager"
                }
            }
            else if(dbEntry.category=='barista'){
                payload = {
                    self: '/api/v1/barista/'+dbEntry.id,
                    email: dbEntry.email,
                    category: "barista"
                }
            }
            else if(dbEntry.category=='cameriere'){
                payload = {
                    self: '/api/v1/cameriere/'+dbEntry.id,
                    email: dbEntry.email,
                    category: "cameriere"
                }
            }
        });
        var options={
            expiresIn:86400
        }
        if(userCount==0){
            res.status(404).json({"error":"User not found"});
        }else{
            var token;
            try{
                token=jwt.sign(payload,process.env.SUPER_SECRET,options);
                
                res.status(200).json({
                    success: true,
                    message: "Here's your token!",
                    token: token,
                    email: payload.email,
                    self: payload.self,
                    category: payload.category
                });
            }
            catch(err){
                console.log(err);
            }
        }
    }
    catch(err){
        console.log(err);
    }
});

module.exports = router;