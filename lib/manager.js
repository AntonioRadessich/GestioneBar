const express=require('express');
const { use } = require('./cameriere.js');
const router=express.Router();
const db=require('./db.js');


router.post('', async (req, res) => {
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
    }
    
});

router.post('/update', async (req,res)=>{
    let user = {
        id: req.body.id,
        email: req.body.email,
        category: req.body.category
    };
    await db.users.update(user);
    // controllare ID
    // Is time to learn MongoDB
    res.status(201).send();
});

module.exports = router;