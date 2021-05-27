const { request, response } = require('express');

const Usuario = require('../models/usuario');
const Medico = require('../models/medicos');
const Hospital = require('../models/hospital');

const getBuscarTodo = async(req = request, res = response) => {

    const tabla = req.params.tabla;
    const busqueda = req.params.busqueda;
    const regx = new RegExp(busqueda, 'i');

    let data = [];

    switch (tabla) {
        case 'medicos':
            data = await Medico.find({ nombre: regx })
                .populate('usuario', 'nombre img')
                .populate('hospital', 'nombre img');
            break;
        case 'usuarios':
            data = await Usuario.find({ nombre: regx })
                .populate('usuario', 'nombre img');
            break;
        case 'hospitales':
            data = await Hospital.find({ nombre: regx });
            break;

        default:
            return res.status(400).json({
                ok: false,
                msg: 'La tabla tiene que ser usuarios, medicos o hospitales'
            });


    }
    res.json({
        ok: true,
        resultados: data
    });


};
const getColeccion = async(req = request, res = response) => {

    const busqueda = req.params.busqueda;
    const regx = new RegExp(busqueda, 'i');


    const [usuarios, medicos, hospitales] = await Promise.all([
        Usuario.find({ nombre: regx }),
        Medico.find({ nombre: regx }),
        Hospital.find({ nombre: regx })
    ]);

    res.json({
        ok: true,
        usuarios,
        medicos,
        hospitales
    });
};



module.exports = {
    getBuscarTodo,
    getColeccion
};