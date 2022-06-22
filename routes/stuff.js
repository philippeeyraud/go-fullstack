const express = require('express');
const router = express.Router();

const stuffCtrl = require('../controllers/stuff');

//pour intercepter les req post on crée une nouvelle instance de notre modele Thing.On delete l'Id car ce ne sera pas le bon, il est généré automatiquement par MongoDB
router.post('/', stuffCtrl.createThing);

//Rajouter une route put pour modifier notre objet
//Quel objet on modifie? C'est celui dont l'id correspond à celui envoyé ds les parametres de requête.

router.put('/:id', stuffCtrl.modifyThing);
router.delete('/:id', stuffCtrl.deleteThing);
//Trouver un seul objet par son identifiant avec la methode find
//On veut que l'id du thing(objet en vente) soit le même que le param de requête.
router.get('/:id', stuffCtrl.getOneThing);


//on rajoute l'url visée par l'application(la route)
//On va utiliser la methode find, on veut la liste complete des objets, on récupère le tableau de la collection thing (things)retournés  par la base de donnée et on les renvoie avec un code 200.
router.get('/', stuffCtrl.getAllThings);

module.exports = router;