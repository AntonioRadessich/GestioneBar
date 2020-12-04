const express=require('express');
const router=express.Router();
const db=require('./db.js');

router.post('', async (req,res)=>{
    let order={
        user: req.body.user,
        listOfOrders:req.body.listOfOrders,
        table:parseInt(req.body.table)
    };

    let orderId = await db.orders.insert(order);
    res.location("/api/v1/ordinazioni/" + orderId).status(201).send();
});

router.get('', async (req,res)=>{
    let orders;
    try{
        orders=await db.orders.all();
    }
    catch(err){
        console.log(err);
    }

    res.status(200).json(orders);
});

router.put('', async (req,res)=>{
    var f=false;
    if(req.body.finished=='true'){
        f=true;
    }
    let order = {
        id: req.body.id,
        user: req.body.user,
        listOfOrders: req.body.listOfOrders,
        table: req.body.table,
        finished:f
    };
    await db.orders.update(order);
    res.status(201).send();
});

router.delete('/:id', async (req,res)=>{
    await db.orders.delete(req.params.id);
    res.status(200).send();
});

module.exports = router;