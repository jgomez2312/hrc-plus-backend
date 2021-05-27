const fs = require('fs');

const Usuario = require('../models/usuario');
const Medico = require('../models/medicos');
const Hospital = require('../models/hospital');


const borrarImagen = (path) => {
    if (fs.existsSync(path)) {
        fs.unlinkSync(path);
    }
};

const actualizaImagen = async(tipo, id, nombreArchivo) => {


    switch (tipo) {
        case 'medicos':
            const medico = await Medico.findById(id);
            if (!medico) {
                return false;
            }
            const pathMedico = `./uploads/medicos/${medico.img}`;
            borrarImagen(pathmedico);

            medico.img = nombreArchivo;
            await medico.save();
            return true;
            break;

        case 'usuarios':
            const usuario = await Usuario.findById(id);
            if (!usuario) {
                return false;
            }
            const pathUsuario = `./uploads/usuarios/${usuario.img}`;
            borrarImagen(pathUsuario);

            usuario.img = nombreArchivo;
            await usuario.save();
            return true;
            break;

        case 'hospitales':
            const hospital = await Hospital.findById(id);
            if (!hospital) {
                return false;
            }
            const pathHospital = `./uploads/hospitales/${hospital.img}`;
            borrarImagen(pathHospital);

            hospital.img = nombreArchivo;
            await hospital.save();
            return true;
            break;

        default:
            return res.status(400).json({
                ok: false,
                msg: 'La tabla tiene que ser usuarios, medicos o hospitales'
            });


    }


};

module.exports = {
    actualizaImagen
};