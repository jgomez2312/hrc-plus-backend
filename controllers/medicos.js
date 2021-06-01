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

    const id = req.params.id;
    const uid = req.uid;


    try {

        const MedicoDB = await Medico.findById(id);
        if (!MedicoDB) {
            return res.status(404).json({
                ok: false,
                msg: 'El Medico introducido no esiste en la DB.'
            });
        }

        const cambiosMedico = {
            ...req.body,
            usuario: uid,
        };

        const MedicoActializado = await Medico.findByIdAndUpdate(id, cambiosMedico, { new: true });

        res.json({
            ok: true,
            Medico: MedicoActializado
        });

    } catch (error) {
        console.log(error);
        res.status(401).json({
            ok: false,
            msg: 'Hable con el administrador '
        });

    }

};

const deleteMedicos = async(req = request, res = response) => {
    const id = req.params.id;

    try {

        const MedicoDB = await Medico.findById(id);
        if (!MedicoDB) {
            return res.status(404).json({
                ok: false,
                msg: 'El Medico introducido no esiste en la DB.'
            });
        }

        await Medico.findByIdAndDelete(id);

        res.json({
            ok: true,
            msg: 'Medico Borrado de la DB'
        });

    } catch (error) {
        console.log(error);
        res.status(401).json({
            ok: false,
            msg: 'Hable con el administrador '
        });

    }
};



module.exports = {
    getMedicos,
    postMedicos,
    putMedicos,
    deleteMedicos
};