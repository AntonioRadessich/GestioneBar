const express=require('express');
const { request } = require('http');
const { use } = require('./cameriere.js');
const router=express.Router();
const db=require('./db.js');


router.post('/users', async (req, res) => {
    let user = {
        email: req.body.email,
        category: req.body.category
    };
    /**if (!user.email || typeof user.email != 'string' || !checkIfEmailInString(user.email)) {
        res.status(400).json({ error: 'The field "email" must be a non-empty string, in email format' });
        return;
    }**/
    let userId = await db.users.insert(user);
    if(user.category == "manager"){
        res.location("/api/v1/manager/" + userId).status(201).send();
    }else if(user.category == "barista"){
        res.location("/api/v1/barista/" + userId).status(201).send();
    }else if(user.category == "cameriere"){
        res.location("/api/v1/cameriere/" + userId).status(201).send();
    }else{
        res.status(405).send();
    }
    
});

router.get('/users', async (req, res) =>{
    let users;
    try{
        users = await db.users.all();
        users=users.filter(() => {
            return true;
        })
        .map((entry) => {
            return {
                self: '/api/v1/' + entry.category + '/' + entry.id,
                email: entry.email
            };
        });
    }catch(err){
        console.log(err);
    }

    res.status(200).json(users);
});

router.get('/users/:id', async (req,res)=>{
    let users;
    if(isNaN(parseInt(req.params.id))){
        res.status(400).send();
    }
    try{
        users = await db.users.all();
        users=users.filter((dbEntry) => {
            if (dbEntry.id) {
                return dbEntry.id == req.params.id;
            }
            return true;
        })
        .map((entry) => {
            return {
                self: '/api/v1/' + entry.category + '/' + entry.id,
                email: entry.email
            };
        });
    }catch(err){
        res.status().send();
    }

    res.status(200).json(users);
});

router.put('/users/:id', async (req,res)=>{
    let user = {
        id: req.body.id,
        email: req.body.email,
        category: req.body.category
    };
    let ris;
    if(isNaN(parseInt(req.params.id))){
        res.status(400).send();
    }
    ris=await db.users.update(user);
    if(ris == 0){
        res.status(404).send();
    }
    //Security posticipata, status 405 in sospeso
    
    res.status(201).send();
});

router.delete('/users/:id', async (req,res)=>{
    let ris = 0;
    if(isNaN(parseInt(req.params.id))){
        res.status(400).send();
    }
    ris = await db.users.delete(req.params.id);
    if(ris == 0){
        res.status(404).send();
    }
    //Security posticipata, status 405 in sospeso

    res.status(201).send();
});

module.exports = router;