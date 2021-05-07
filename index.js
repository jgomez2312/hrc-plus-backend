const express = require('express');
const cors = require('cors')
require('dotenv').config();

const { request, response } = require('express');
const { dbConn } = require('./database/config');

// Crear servidor de express
const app = express();

// Cors
app.use(cors());

// DB conexion
dbConn();



//Rutas
app.get('/', (req = request, res = response) => {

    res.json({
        ok: true,
        msg: 'Hola Mundo'
    });
});



app.listen(process.env.PORT, () => {
    console.log('Servidor corriendo en el puerto: ' + process.env.PORT);
});