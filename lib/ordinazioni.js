const express=require('express');
const router=express.Router();
var db=require('./db.js');

router.post('', async (req,res)=>{
    if (!req.body.user || !req.body.listOfOrders || !req.body.table || isNaN(parseInt(req.body.table))){
        res.status(400).json({ error: 'The request must contain the following JSON {user:string, listOfOrders:array of JSON -> { beer:string, quantity:integer }, table:integer}' });
        return;
    }
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
    var f=req.body.finished||false;
    let order = {
        id: req.body.id,
        user: req.body.user,
        listOfOrders: req.body.listOfOrders,
        table: req.body.table,
        finished:f
    };
    var resp = await db.orders.update(order);
    if(resp.matchedCount==0){
        res.status(404).send();
    }else{
        res.status(201).send();
    }
});

router.delete('/:id', async (req,res)=>{
    var resp = await db.orders.delete(req.params.id);
    if(resp.deletedCount==0){
        res.status(404).send();
    }else{
        res.status(200).send();
    }
});

module.exports = router;