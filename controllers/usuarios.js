const { request, response } = require('express');
const bcryptjs = require('bcryptjs');


const Usuario = require('../models/usuario');
const generateJWT = require('../helpers/jwt');

const getUsuarios = async(req = request, res = response) => {

    const usuarios = await Usuario.find({}, 'nombre email password google');

    res.json({
        ok: true,
        usuarios,
        uid: req.uid
    });
};

const postUsuarios = async(req = request, res = response) => {

    const { nombre, password, email } = req.body;

    try {

        const existeEmail = await Usuario.findOne({ email });

        if (existeEmail) {
            return res.status(400).json({
                ok: false,
                msg: 'El correo ya está registrado'
            });
        }

        const usuario = new Usuario(req.body);

        // Encriptar contraseña.
        const salt = bcryptjs.genSaltSync();
        usuario.password = bcryptjs.hashSync(password, salt);

        // Gaurdar Usuario
        await usuario.save();

        // Generar Token 
        const token = await generateJWT(usuario.id);

        res.json({
            ok: true,
            usuario,
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

const putUsuarios = async(req = request, res = response) => {

    const uid = req.params.id;

    try {

        const usuarioDB = await Usuario.findById(uid);
        if (!usuarioDB) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe ningun usuario con ese UID'
            });
        }
        // Actualizacion
        const { password, google, email, ...campos } = req.body;

        if (usuarioDB.email !== email) {
            const existeEmail = await Usuario.findOne({ email });
            if (existeEmail) {
                return res.status(400).json({
                    ok: false,
                    msg: 'Ya esiste un email con ese email '
                });
            }
        }

        campos.email = email;
        const usuarioActualizada = await Usuario.findByIdAndUpdate(uid, campos, { new: true });


        res.json({
            ok: true,
            usuarioActualizada,
            uid: req.uid
        });


    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado ... revisar logs '
        });
    }

};

const deleteUsuarios = async(req = request, res = response) => {

    const uid = req.params.id;

    try {
        const usuarioDB = await Usuario.findById(uid);
        if (!usuarioDB) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe ningun usuario con ese UID'
            });
        }

        await Usuario.findByIdAndDelete(uid);


        res.json({
            ok: true,
            msg: 'Usuario Eliminado'
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
    getUsuarios,
    postUsuarios,
    putUsuarios,
    deleteUsuarios
};