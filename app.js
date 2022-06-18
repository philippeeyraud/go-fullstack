//importeer express
const express = require('express');

const Thing = require('./models/Thing');
require("dotenv").config()

//création de l'application express
const app = express();

//Importation de mongoose et connection à mongoDB. Utilisation de .end pour permettre al'utilisateur de mettre ses propres info sans toucher au code.
const mongoose = require('mongoose');
mongoose.connect(`${process.env.DB_URL}://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_URL_CLUSTER}`,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(() => console.log('Connexion à MongoDB échouée !'));

//Ce middelware intercepte toute les requêtes qui ont un content type json et met a disposition ce contenu sur l objet requete body
app.use(express.json());

//definition des headers pour le CORS(cross origin ressource share)
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});


//pour intercepter les req post
app.post('/api/stuff', (req, res, next) => {
    delete req.body._id;
    const thing = new Thing({
        ...req.body
    });
    //Enregistrer l'objet ds la base
    thing.save()
        .then(() => res.status(201).json({
            message: 'Objet enregistré !'
        }))
        .catch(error => res.status(400).json({ error }));
});


//on rajoute l'url visée par l'application(la route)
//On va utiliser la methode find, on veut la liste complete des objets, on récupère le tableau des  things retournés  par la base de donnée et on les renvoie avec un code 200.
app.use('/api/stuff', (req, res, next) => {
    Thing.find() 
    .then(things => res.status(200).json(things))
    .catch(error => res.status(400).json({ error}));

    
});






//export de l application express pour que l'on puisse y accèder depuis les fichiers de notre projet et particulierement node.
module.exports = app;