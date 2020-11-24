//db.js
const { json } = require('body-parser');
const { Db } = require('mongodb');
const mongoose = require('mongoose');

const uri = "mongodb+srv://admin:MehrZeit2020@ingsoft2cluster.nuyzr.mongodb.net/GestioneBar?retryWrites=true&w=majority"

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


const storage = {
    users: []
};

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

module.exports = {
    users
};
