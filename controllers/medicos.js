const { request, response } = require('express');

const Medico = require('../models/medicos');

const getMedicos = async(req = request, res = response) => {

    const medicos = await Medico.find()
        .populate('usuario', 'nombre img')
        .populate('hospital', 'nombre');

    res.json({
        ok: true,
        medicos
    });
};

const postMedicos = async(req = request, res = response) => {

    const uid = req.uid;
    const medico = new Medico({
        usuario: uid,
        ...req.body
    });

    try {

        const medicoDB = await medico.save();

        res.json({
            ok: true,
            medico: medicoDB
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado ... revisar logs '
        });
    }


};

const putMedicos = async(req = request, res = response) => {

    res.json({
        ok: true,
        msg: 'PUT Medicos'
    });

};

const deleteMedicos = async(req = request, res = response) => {
    res.json({
        ok: true,
        msg: 'DELETE Medicos'
    });
};



module.exports = {
    getMedicos,
    postMedicos,
    putMedicos,
    deleteMedicos
};