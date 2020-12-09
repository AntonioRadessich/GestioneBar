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
        img: req.body.img,
        infoGenerali:{
            produttore: req.body.infoGenerali.produttore,
            distributore: req.body.infoGenerali.distributore,
            gradazioneAlcolica: req.body.infoGenerali.gradazioneAlcolica,
            tempoDiFermentazione: req.body.infoGenerali.tempoDiFermentazione,
            gusto: req.body.infoGenerali.gusto,
            calorie: req.body.infoGenerali.calorie,
            colore: req.body.infoGenerali.colore,
        },
        ingredienti:req.body.ingredienti
    }
    if(!beer.name){
        res.status(400).json({"error":"To be able to add a beer a name must be provided"});
        return;
    }
    let beerId = await db.beers.insert(beer);

    res.location("/api/v1/birre/" + beerId).status(201).send();
});

router.put('', async (req,res)=>{
    let beer = {
        id: req.body.id,
        name: req.body.name,
        img: req.body.img,
        infoGenerali:{
            produttore: req.body.infoGenerali.produttore,
            distributore: req.body.infoGenerali.distributore,
            gradazioneAlcolica: req.body.infoGenerali.gradazioneAlcolica,
            tempoDiFermentazione: req.body.infoGenerali.tempoDiFermentazione,
            gusto: req.body.infoGenerali.gusto,
            calorie: req.body.infoGenerali.calorie,
            colore: req.body.infoGenerali.colore,
        },
        ingredienti:req.body.ingredienti
    };
    let risp= await db.beers.update(beer);
    if(risp.matchedCount==0){
        res.status(404).json({"error":"Beer not found"});
    }else{
        res.status(201).send();
    }
});

router.delete('/:id', async(req,res)=>{
    let risp;
    risp = await db.beers.delete(req.params.id);
    if(risp.deletedCount==0){
        res.status(404).json({"error":"Beer not found"});
    }else{
        res.status(200).send();
    }
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
            name: entry.name,
            img: entry.img,
            produttore: entry.infoGenerali.produttore,
            distributore: entry.infoGenerali.distributore,
            gradazioneAlcolica: entry.infoGenerali.gradazioneAlcolica,
            tempoDiFermentazione: entry.infoGenerali.tempoDiFermentazione,
            gusto: entry.infoGenerali.gusto,
            calorie: entry.infoGenerali.calorie,
            colore: entry.infoGenerali.colore,
            ingredienti:entry.ingredienti
        }
    })
    if(beer.length==0){
        res.status(404).json({"error":"Beer not found"});   
    }else{
        res.status(200).json(beer);
    }
});

router.get('/nome/closestMatch/:nome', async (req, res) => {
    let beer;
    beer=await db.beers.find(req.params.nome);
    beer.map((entry)=>{
        return {
            self: "/api/v1/birre/"+entry.id,
            name: entry.name
        }
    })
    if(beer.length==0){
        res.status(404).json({"error":"Beer not found"});   
    }else{
        res.status(200).json(beer);
    }
});

module.exports = router;