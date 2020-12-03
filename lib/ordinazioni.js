const express=require('express');
const router=express.Router();
const db=require('./db.js');

router.post('', async (req,res)=>{
    let order={
        user: req.body.user,
        beer: req.body.beer,
        quantity: parseFloat(req.body.quantity)
    };

    let orderId = await db.orders.insert(order);
    res.location("/api/v1/ordinazioni/" + orderId).status(201).send();
});

module.exports = router;