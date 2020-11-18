const express = require('express');
const app = express();
const db=require('./db.js');

app.use(express.json());
app.use(express.urlencoded());


app.use('/', express.static('static'));

/* Moduli per la gestione delle richieste alle API */
const manager = require('./manager.js');
const barista = require('./barista.js');
const cameriere = require('./cameriere.js');
//const { addListener, mainModule } = require('process');

app.use('/api/v1/manager', manager);
app.use('/api/v1/barista', barista);
app.use('/api/v1/cameriere', cameriere);

app.get('/api/v1/:category', async function(req,res){
    let users;
    try{
        users = await db.users.all();
        users=users.filter((dbEntry) => {
            if (dbEntry.category) {
                return dbEntry.category == req.params.category;
            }
            return true;
        })
            .map((entry) => {
                return {
                    self: '/api/v1/' + entry.category + '/' + entry.id,
                    email: entry.email
                };
            });
    }
    catch(err){
        console.log(err);
    }

    res.status(200).json(users);
});

app.get('/api/v1', async function(req,res){
    console.log("...");
    console.log(req.email);
    let user;
    var categoria;
    try{
        user=await db.users.all();
        user=user.filter((dbEntry)=>{
            if(req.query.email){
                return dbEntry.email==req.query.email;
            }
        })
        .map((dbEntry)=>{
            if(dbEntry.category=='manager'){
                categoria="manager";
                return {
                    self: '/api/v1/manager/'+dbEntry.id,
                    email: dbEntry.email
                }
            }
            else if(dbEntry.category=='barista'){
                categoria="barista";
                return {
                    self: '/api/v1/barista/'+dbEntry.id,
                    email: dbEntry.email
                }
            }
            else if(dbEntry.category=='cameriere'){
                categoria="cameriere";
                return {
                    self: '/api/v1/cameriere/'+dbEntry.id,
                    email: dbEntry.email
                }
            }
        });
    }
    catch(err){
        console.log(err);
    }

    res.status(200).json(user);
});

/* Default 404 handler */
app.use((req, res) => {
    res.status(404);
    res.json({ error: 'Not found' });
});

module.exports = app;