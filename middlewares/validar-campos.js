const { request, response } = require('express');
const { validationResult } = require('express-validator');

const validarCampos = (req = request, res = response, next) => {

    const validatorError = validationResult(req);
    if (!validatorError.isEmpty()) {
        return res.status(400).json({
            ok: false,
            errores: validatorError.mapped()
        });
    }

    next();
};

module.exports = {
    validarCampos
};