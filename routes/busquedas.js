const { Router } = require('express');

const { getBuscarTodo, getColeccion } = require('../controllers/busquedas');
const { validarJWT } = require('../middlewares/validad-jwt');

const router = Router();


router.get('/:busqueda', validarJWT, getColeccion);
router.get('/coleccion/:tabla/:busqueda', validarJWT, getBuscarTodo);


module.exports = router;