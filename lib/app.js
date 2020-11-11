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
const { addListener, mainModule } = require('process');

app.use('/api/v1/manager', manager);
app.use('/api/v1/barista', barista);
app.use('/api/v1/cameriere', cameriere);

app.get('/', function(req,res){
    let user=db.user.all()
    .filter((dbEntry)=>{
        if(req.query.email){
            return dbEntry.email==req.query.email;
        }
    })
    .map((dbEntry)=>{
        if(dbEntry.category=='Manager'){
            return {
                self: '/api/v1/manager/'+dbEntry.id
            };
        }
        else if(dbEntry.category=='Barista'){
            return {
                self: '/api/v1/barista/'+dbEntry.id
            };
        }
        else if(dbEntry.category=='Cameriere'){
            return {
                self: '/api/v1/cameriere/'+dbEntry.id
            };
        }
        else{
            res.status(404);
        }

        res.status(200).json(user);
    });
});

/* Default 404 handler */
app.use((req, res) => {
    res.status(404);
    res.json({ error: 'Not found' });
});

module.exports = app;