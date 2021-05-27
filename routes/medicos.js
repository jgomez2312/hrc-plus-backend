const { Router } = require('express');
const { check } = require('express-validator');

const { getMedicos, postMedicos, putMedicos, deleteMedicos } = require('../controllers/Medicos');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validad-jwt');

const router = Router();


router.get('/', validarJWT, getMedicos);


router.post('/', [
    validarJWT,
    check('nombre', 'El nombre de Medico es requerido').not().isEmpty(),
    check('hospital', 'El Id del Hospital tiene que ser valido.').isMongoId(),
    validarCampos
], postMedicos);

router.put('/:id', [

], putMedicos);

router.delete('/:id', [

], deleteMedicos);


module.exports = router;