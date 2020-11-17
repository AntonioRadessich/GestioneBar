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


/*conn.collection('Utenti').insertOne({
    email: "adsadsads@unitn.com",
    category: "barista"
});*/

const storage = {
    users: []
};

const users = {
    insert(user) {
        tmp=0;
        var id = conn.collection('Utenti').find()
        .forEach((entry) =>{
            if(entry.id > tmp){
                tmp=entry.id;
            }
        })
        .then(()=>{
            user.id=++tmp;
            conn.collection('Utenti').insertOne(user);
        });
        return user.id;
    },
	update(user) {
        conn.collection('Utenti')
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
    
        /*console.log(id);
        
		for(var i = 0; i < storage.users.length; i++){
			if(storage.users[i].id == user.id){
				storage.users[i].email == user.email;
				storage.users[i].category == user.category;
			}
		}*/
		return user.id;
	},
    async all() {
        /*conn.collection('Utenti').find()
        .forEach((entry)=>{
            storage.users.push({
                "id" : "" + entry.id,
                "email" : "" + entry.email,
                "category" : "" +entry.category
            });
        })
        .then(()=>{
            console.log(storage.users);
            return storage.users;
        });
        */
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
