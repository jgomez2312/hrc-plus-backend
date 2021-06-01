const { request, response } = require('express');

const Hospital = require('../models/hospital');


const getHospitales = async(req = request, res = response) => {

    const hospitales = await Hospital.find()
        .populate('usuario', 'nombre img');

    res.json({
        ok: true,
        hospitales
    });
};

const postHospitales = async(req = request, res = response) => {

    const uid = req.uid;
    const hospital = new Hospital({
        usuario: uid,
        ...req.body
    });

    try {

        const hospitalDB = await hospital.save();

        res.json({
            ok: true,
            hospital: hospitalDB
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado ... revisar logs '
        });
    }



};

const putHospitales = async(req = request, res = response) => {

    const hospitalId = req.params.id;
    const uid = req.uid;


    try {

        const hospitalDB = await Hospital.findById(hospitalId);
        if (!hospitalDB) {
            return res.status(404).json({
                ok: false,
                msg: 'El Hospital introducido no esiste en la DB.'
            });
        }

        const cambiosHopitales = {
            ...req.body,
            usuario: uid,
        };

        const hospitalActializado = await Hospital.findByIdAndUpdate(hospitalId, cambiosHopitales, { new: true });

        res.json({
            ok: true,
            hospital: hospitalActializado
        });

    } catch (error) {
        console.log(error);
        res.status(401).json({
            ok: false,
            msg: 'Hable con el administrador '
        });

    }

};

const deleteHospitales = async(req = request, res = response) => {

    const hospitalId = req.params.id;


    try {

        const hospitalDB = await Hospital.findById(hospitalId);
        if (!hospitalDB) {
            return res.status(404).json({
                ok: false,
                msg: 'El Hospital introducido no esiste en la DB.'
            });
        }



        await Hospital.findByIdAndDelete(hospitalId);

        res.json({
            ok: true,
            msg: 'Hospital eliminado'
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
    getHospitales,
    postHospitales,
    putHospitales,
    deleteHospitales
};