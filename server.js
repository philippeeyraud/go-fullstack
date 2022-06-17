
const http = require('http');
//on importe le app.js
const app = require('./app');

app.set('port', process.env.PORT || 3000);
//on passe cette application à notre server
const server = http.createServer(app);
 

server.listen(process.env.PORT || 3000);
