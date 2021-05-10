const { response, request } = require("express");
const bcryptjs = require('bcryptjs');
const Usuario = require('../models/usuario');
const generateJWT = require("../helpers/jwt");

const login = async(req = request, res = response) => {

    const { email, password } = req.body;

    try {

        // Verificar Email
        const usuarioDB = await Usuario.findOne({ email });
        if (!usuarioDB) {
            return res.status(400).json({
                ok: true,
                msg: 'El usuario o la contraseña no son correctos'
            });
        }

        // Verificar contraseña

        const validPassword = bcryptjs.compareSync(password, usuarioDB.password);

        if (!validPassword) {
            return res.status(400).json({
                ok: true,
                msg: 'El usuario o la contraseña no son correctos'
            });
        }

        // Generar  el JWTK
        const token = await generateJWT(usuarioDB.id);

        res.json({
            ok: true,
            msg: 'Auth login',
            token
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado ... revisar logs '
        });
    }

};

module.exports = {
    login
};