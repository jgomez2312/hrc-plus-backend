const { Router } = require('express');
const { check } = require('express-validator');
const { login, loginGoogle, renewToken } = require('../controllers/auth');
const { validarJWT } = require('../middlewares/validad-jwt');
const { validarCampos } = require('../middlewares/validar-campos');

const router = Router();

router.post('/', [
        check('email', 'El email es obligatorio').isEmail(),
        check('password', 'El password es obligatorio').not().isEmpty(),
        validarCampos
    ],
    login);

router.post('/google', [
        check('token', 'El Token de Google es obligatorio').not().isEmpty(),
        validarCampos
    ],
    loginGoogle);

router.get('/renew', validarJWT, renewToken);

module.exports = router;