const { response, request } = require("express");
const bcryptjs = require('bcryptjs');
const Usuario = require('../models/usuario');
const generateJWT = require("../helpers/jwt");
const { googleVerify } = require("../helpers/google-verify");

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

const loginGoogle = async(req = request, res = response) => {

    const googleToken = req.body.token;

    try {
        const { name, email, picture } = await googleVerify(googleToken);

        // Comprobar si el usuario "email" existe ya en la DB.
        const usuarioDB = await Usuario.findOne({ email });
        let usuario;

        if (!usuarioDB) {
            // Si no existe el usuario.
            usuario = new Usuario({
                nombre: name,
                email,
                password: '@@@',
                img: picture,
                google: true
            });
        } else {
            // Existe el usuario.
            usuario = usuarioDB;
            usuario.google = true;
            usuario.password = '@@@';
        }
        // Guardar en DB.
        await usuario.save();

        // Generar  el JWTK
        const token = await generateJWT(usuario.id);

        res.json({
            ok: true,
            msg: "Google Sign In",
            token
        });

    } catch (error) {
        res.status(401).json({
            ok: false,
            msg: "El token no es valido."
        });
    }

};

const renewToken = async(req = request, res = response) => {

    const uid = req.uid;

    // Generar  el JWTK
    const token = await generateJWT(uid);

    res.json({
        ok: true,
        token
    });
};

module.exports = {
    login,
    loginGoogle,
    renewToken
};