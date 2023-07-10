// Arranca app
const app = require('./app')
const db = require('./database')

// Variables globales
// const port = 3000;
const port = process.env.PORT || 3000;

// Server is listenning
app.listen(port);
console.log("Server on port", process.env.PORT || port)