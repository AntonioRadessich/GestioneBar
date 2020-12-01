const express=require('express');
const router=express.Router();
const db=require('./db.js');

router.get('/:id', async (req, res) => {
    let beer;
    try{
        beer=await db.beers.all();
        beer=beer.filter((dbEntry)=>{
            if(dbEntry.id){
                return dbEntry.id==req.params.id;
            }
            return true;
        })
        .map((entry)=>{
            return {
                self: "/api/v1/birre/"+entry.id,
                name: entry.name
            }
        })
    }
    catch(err){

    }
    
    res.status(200).json(beer);
});

router.get('', async (req, res) => {
    let beers;
    try{
        beers=await db.beers.all();
    }
    catch(err){
        console.log(err);
    }

    res.status(200).json(beers);
});

router.post('', async (req, res) => {
    let beer = {
        name: req.body.name,
    };
    
    let beerId = await db.beers.insert(beer);
    res.location("/api/v1/birre/" + beerId).status(201).send();
});

router.put('', async (req,res)=>{
    let beer = {
        id: req.body.id,
        name: req.body.name,
    };
    await db.beers.update(beer);
    res.status(201).send();
});

router.delete('/:id', async(req,res)=>{
    await db.beers.delete(req.params.id);
    res.status(200).send();
})


//ricerca birre per nome
router.get('/nome/:nome', async (req, res) => {
    let beer;
    beer=await db.beers.all();
    beer=beer.filter((dbEntry)=>{
        if(dbEntry.id){
            return dbEntry.name==req.params.nome;
        }
        return true;
    })
    .map((entry)=>{
        return {
            self: "/api/v1/birre/"+entry.id,
            name: entry.name
        }
    })
    if(beer.length==0){
        res.status(404).json(beer);   
    }else{
        res.status(200).json(beer);
    }
});

module.exports = router;