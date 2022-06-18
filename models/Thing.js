//importer mongoose 
const mongoose = require('mongoose');
//On va créer notre schéma de données
const thingSchema = mongoose.Schema({
    title: { type: String, required: true},
    description: { type: String, required: true},
    imageUrl: { type: String, required: true},
    userId: { type: String, required: true},
    price: { type: Number, required: true},
});
//Pour que ce schema soit utilisable,on va exporter mongoose.model pour utiliser notre schema
module.exports = mongoose.model('Thing', thingSchema);