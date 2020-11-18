const express=require('express');
const router=express.Router();
const db=require('./db.js');

router.get('', async (req, res) => {
    let beers = await Beer.find({}).exec();
    beers = beers.map( (beer) => {
        return {
            self: '/api/v1/birre/' + beer.id,
            name: beer.name
        };
    });
    res.status(200).json(beers);
});

router.get('/:id', async (req, res) => {
    let beer = await Beer.findById(req.params.id).exec();
    res.status(200).json({
        self: '/api/v1/birre/' + beer.id,
        title: beer.name
    });
});

router.post('', (req, res) => {
    let beer = {
        name: req.body.name,
    };
    
    let beerId = db.beers.insert(beer);
    res.location("/api/v1/birre/" + beerId).status(201).send();
});

router.post('/update', (req,res)=>{
    let beer = {
        id: req.body.id,
        name: req.body.name,
    };
    db.users.update(beer);
});

module.exports = router;