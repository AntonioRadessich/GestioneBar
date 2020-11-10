const express = require('express');
const app = express();

app.use(express.json());
app.use(express.urlencoded());

//app.use('/', express.static('static'));

/* Moduli per la gestione delle richieste alle API */
const manager = require('./manager.js');
const barista = require('./barista.js');
const cameriere = require('./cameriere.js');

app.use('/api/v1/manager', manager);
app.use('/api/v1/barista', barista);
app.use('/api/v1/cameriere', cameriere);
app.use('/', function(req,res){
    
});

/* Default 404 handler */
app.use((req, res) => {
    res.status(404);
    res.json({ error: 'Not found' });
});

module.exports = app;