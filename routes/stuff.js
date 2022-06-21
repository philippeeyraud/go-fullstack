const express = require('express');
const router = express.Router();
//pour intercepter les req post on crée une nouvelle instance de notre modele Thing.On delete l'Id car ce ne sera pas le bon, il est généré automatiquement par MongoDB
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
//Rajouter une route put pour modifier notre objet
//Quel objet on modifie? C'est celui dont l'id correspond à celui envoyé ds les parametres de requête.

app.put('/api/stuff/:id', (req, res, next) => {
    Thing.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
        .then(() => res.status(200).json({ message: 'Objet modifié !' }))
        .catch(error => res.status(400).json({ error }));
});
app.delete('/api/stuff/:id', (req, res, next) => {
    Thing.deleteOne({ _id: req.params.id })
        .then(() => res.status(200).json({ message: 'Objet supprimé !' }))
        .catch(error => res.status(400).json({ error }));
});
//Trouver un seul objet par son identifiant avec la methode find
//On veut que l'id du thing(objet en vente) soit le même que le param de requête.
app.get('/api/stuff/:id', (req, res, next) => {
    Thing.findOne({ _id: req.params.id })
        .then(thing => res.status(200).json(thing))
        .catch(error => res.status(404).json({ error }));
});


//on rajoute l'url visée par l'application(la route)
//On va utiliser la methode find, on veut la liste complete des objets, on récupère le tableau de la collection thing (things)retournés  par la base de donnée et on les renvoie avec un code 200.
app.get('/api/stuff', (req, res, next) => {
    Thing.find()
        .then(things => res.status(200).json(things))
        .catch(error => res.status(400).json({ error }));


});
