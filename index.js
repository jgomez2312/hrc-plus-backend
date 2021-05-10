require('dotenv').config();
const express = require('express');
const cors = require('cors');

const { dbConn } = require('./database/config');

// Crear servidor de express
const app = express();

// Cors
app.use(cors());

// Lectura y parseo  del Body
app.use(express.json());

// DB conexion
dbConn();

//Rutas
app.use('/api/usuarios', require('./routes/usuarios'));
app.use('/api/login', require('./routes/auth'));




app.listen(process.env.PORT, () => {
    console.log('Servidor corriendo en el puerto: ' + process.env.PORT);
});