const express = require('express');
const app = express();
const db=require('./db.js');
const jwt=require('jsonwebtoken');

app.use(express.json());
app.use(express.urlencoded());


app.use('/', express.static('static'));

/* Moduli per la gestione delle richieste alle API */
const login=require('./login.js');
const tokenChecker=require('./tokenChecker.js');
const manager = require('./users.js');
const birre = require('./birre.js');
//const { addListener, mainModule } = require('process');

app.use('/',login);
app.use('',tokenChecker);

app.use('/api/v1/users', manager);
app.use('/api/v1/birre', birre);

app.get('/api/v1/:category', async function(req,res){
    let users;
    if(req.params.category != "manager" && req.params.category != "barista" && req.params.category != "cameriere" ){
        res.status(400).json({"error":"Insert a valid category: manager, barista or cameriere"});
    }
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

/* Default 404 handler */
app.use((req, res) => {
    res.status(404);
    res.json({ error: 'Not found' });
});

module.exports = app;