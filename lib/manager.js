const express=require('express');
const router=express.Router();
const db=require('./db.js');


router.post('', (req, res) => {
    let user = {
        email: req.body.email,
        category: req.body.category
    };
    
    /**if (!user.email || typeof user.email != 'string' || !checkIfEmailInString(user.email)) {
        res.status(400).json({ error: 'The field "email" must be a non-empty string, in email format' });
        return;
    }**/

    let userId = db.users.insert(user);
    if(user.category == "Manager"){
        res.location("/api/v1/manager/" + userId).status(201).send();
    }else if(user.category == "Barista"){
        res.location("/api/v1/barista/" + userId).status(201).send();
    }else if(user.category == "Cameriere"){
        res.location("/api/v1/cameriere/" + userId).status(201).send();
    }
    
});

router.post('/update', (req,res)=>{
    let user = {
        id: req.body.id,
        email: req.body.email,
        category: req.body.category
    };
    db.users.update(user);
    // controllare ID
    // Is time to learn MongoDB

});

module.exports = router;