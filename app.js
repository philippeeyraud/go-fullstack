//importeer express
const express = require('express');
require("dotenv").config()
//création de l'application express
const app = express();

const mongoose = require('mongoose');
mongoose.connect(`${process.env.DB_URL}://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_URL_CLUSTER}`,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(() => console.log('Connexion à MongoDB échouée !'));


app.use(express.json());
//definition des headers pour le CORS
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});



app.post('/api/stuff', (req, res, next) => {
    console.log(req.body);
    res.status(201).json({
        message: 'objet créé!'
    });
});

//on rajoute l'url visée par l'application(la route)
//l'application frontend va faire une requête
app.get('/api/stuff', (req, res, next) => {
    const stuff = [
        {
            _id: 'oeihfzeoi',
            title: 'Mon premier objet',
            description: ' Les infos de mon premier objet',
            imageUrl: '',
            price: 4900,
            userId: 'qsomihvqios',
        },

        {

            _id: 'oeihfzeomoihi',
            title: 'Mon deuxieme objet',
            description: ' Les infos de mon deuxieme objet',
            imageUrl: '',
            price: 2900,
            userId: 'qsomihvqios',

        },

    ];
    res.status(200).json(stuff);
});






//export de l application express pour que l'on puisse y accèder depuis les fichiers de notre projet et particulierement node.
module.exports = app;