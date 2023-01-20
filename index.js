
const express = require('express');
const cors = require('cors');
const { dbConnection } = require('./db/config');
require('dotenv').config();


// Crear el servidor / aplicacion de express
const app = express();

//Conexion a la BD
dbConnection();


// Directorio publico
app.use( express.static('public'))


//CORS
app.use( cors() );

// Lectura y parseo del body
app.use( express.json() );


// Configurar rutas
// Cualquier ruta que este dentro del ./routes/auth va a tener 
// el prefijo de /api/auth ej. /api/auth/renew
app.use( '/api/auth', require('./routes/auth'));

app.listen( process.env.PORT, ()=>{
    console.log(`Servidor corriendo en puerto ${process.env.PORT}`)
});