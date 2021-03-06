//db.js
const { json } = require('body-parser');
const { Db } = require('mongodb');
const mongoose = require('mongoose');
var tmp = module.parent.parent.filename.split('\\');
tmp = tmp[tmp.length-1];
tmp = tmp.split('.');
tmp = tmp[1]
if(tmp=="test"){
    var uri = "mongodb+srv://admin:MehrZeit2020@ingsoft2cluster.nuyzr.mongodb.net/GestioneBarTest?retryWrites=true&w=majority"
}else{
    var uri = "mongodb+srv://admin:MehrZeit2020@ingsoft2cluster.nuyzr.mongodb.net/GestioneBar?retryWrites=true&w=majority"
}

const connectionParams={
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true 
}
mongoose.connect(uri,connectionParams)
    .then( () => {
        console.log('Connected to database ')
    })
    .catch( (err) => {
        console.error(`Error connecting to the database. \n${err}`);
    })

var conn = mongoose.connection;

const users = {
    async delete(id){
        let ris;
        try{
            ris = await conn.collection('Utenti').deleteOne({ "id" : parseInt(id) });
        }catch(err){
            console.log(err);
        }
        return ris.deletedCount;
    },
    async insert(user) {
        tmp=0;
        var id = await conn.collection('Utenti').find()
        .forEach((entry) =>{
            if(entry.id > tmp){
                tmp=entry.id;
            }
        });
        user.id=++tmp;
        conn.collection('Utenti').insertOne(user);
        return user.id;
    },
	async update(user) {
        let ris;
        ris =await conn.collection('Utenti')
        .updateOne(
            {
                id : parseInt(user.id)
            },
            {
                $set:{
                    id : user.id,
                    "email" : ""+user.email,
                    "category" : ""+user.category
                }
            },
            { 
                //Se true : aggiunge la tupla al db se non esiste
                upsert: false 
            }
        )
    
		return ris.matchedCount;
	},
    async all() {
       var usersToReturn=[];
       try{
        await conn.collection('Utenti').find()
        .forEach((entry)=>{
                usersToReturn.push({
                    "id":""+entry.id,
                    "email":""+entry.email,
                    "category":""+entry.category
                });
            });
       }
       catch(err){
           console.log(err);
       }
       
        return usersToReturn;
    }
};

const beers = {
    async find(nome){
        let beer=[];
        await conn.collection('Birre').find({"name":{$regex: "(?i).*" + nome + ".*"}})
        .forEach((entry) =>{
            beer.push({
                id : entry.id,
                name: entry.name,
                img: entry.img
            });
        });
        return beer;
    },
    async insert(beer) {
        tmp=0;
        var id = await conn.collection('Birre').find();
        await id.forEach((entry) =>{
            if(entry.id > tmp){
                tmp=entry.id;
            }
        });
          
        beer.id=++tmp;
        conn.collection('Birre').insertOne(beer);

        return beer.id;
    },

    async update(beer) {
        let risp;
        risp =await conn.collection('Birre')
        .updateOne(
            {
                id : parseInt(beer.id)
            },
            {
                $set:{
                    id : beer.id,
                    "name" : ""+beer.name,
                    "img": ""+beer.img,
                    "infoGenerali":{
                        "produttore": ""+beer.infoGenerali.produttore,
                        "distributore": ""+beer.infoGenerali.distributore,
                        "gradazioneAlcolica": ""+beer.infoGenerali.gradazioneAlcolica,
                        "tempoDiFermentazione": ""+beer.infoGenerali.tempoDiFermentazione,
                        "gusto": ""+beer.infoGenerali.gusto,
                        "calorie": ""+beer.infoGenerali.calorie,
                        "colore": ""+beer.infoGenerali.colore,
                    },
                    "ingredienti":""+beer.ingredienti,
                }
            },
            { 
                upsert: false 
            }
        )
		return risp;
	},

    async all() {
        var entriesToReturn=[];
        try{
         await conn.collection('Birre').find()
         .forEach((entry)=>{
                entriesToReturn.push({
                    id : entry.id,
                    "name" : ""+entry.name,
                    "img": ""+entry.img,
                    "infoGenerali":{
                        "produttore": ""+entry.infoGenerali.produttore,
                        "distributore": ""+entry.infoGenerali.distributore,
                        "gradazioneAlcolica": ""+entry.infoGenerali.gradazioneAlcolica,
                        "tempoDiFermentazione": ""+entry.infoGenerali.tempoDiFermentazione,
                        "gusto": ""+entry.infoGenerali.gusto,
                        "calorie": ""+entry.infoGenerali.calorie,
                        "colore": ""+entry.infoGenerali.colore,
                    },
                    "ingredienti":""+entry.ingredienti,
                 });
             });
        }
        catch(err){
            console.log(err);
        }
        
        return entriesToReturn;
    },

    async delete(idNumber){
        let risp;
        try{
            risp = await conn.collection('Birre').deleteOne({"id": parseInt(idNumber)})
        }
        catch(err){
            console.log(err);
        }
        return risp;
    }
};

const orders={
    async insert(order) {
        tmp=0;
        var id = await conn.collection('Ordinazioni').find()
        await id.forEach((entry) =>{
            if(entry.id > tmp){
                tmp=entry.id;
            }
        });
          
        order.id=parseInt(++tmp);
        order.finished=false;
        conn.collection('Ordinazioni').insertOne(order);

        return order.id;
    },

    async all(){
        var entriesToReturn=[];
        try{
            await conn.collection('Ordinazioni').find()
            .forEach((entry)=>{
                if(entry.finished==false){
                    entriesToReturn.push({
                        "id":""+entry.id,
                        "user":""+entry.user,
                        "listOfOrders":entry.listOfOrders,
                        "table":entry.table
                    });
                }
            });
        }
        catch(err){
            console.log(err);
        }
        
        return entriesToReturn;
    },

    async delete(idNumber){
        try{
            var resp = await conn.collection('Ordinazioni').deleteOne({"id": parseInt(idNumber)})
        }
        catch(err){
            console.log(err);
        }
        return resp;
    },

    async update(order) {
        var resp = await conn.collection('Ordinazioni')
        .updateOne(
            {
                id:parseInt(order.id)
            },
            {
                $set:{
                    "id":parseInt(order.id),
                    "user":""+order.user,
                    "listOfOrders":order.listOfOrders,
                    "table":parseInt(order.table),
                    "finished":order.finished
                }
            },
            { 
                upsert:false 
            }
        )
		return resp;
	},
}

module.exports = {
    users,
    beers,
    orders
};
