const path = require('path');
const { request, response } = require('express');
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');

const { actualizaImagen } = require('../helpers/actulizar-imagen');

const fileUpload = async(req = request, res = response) => {


    const tipo = req.params.tipo;
    const id = req.params.id;

    // Validar tipo 
    const tiposValidos = ['hospitales', 'medicos', 'usuarios'];
    if (!tiposValidos.includes(tipo)) {
        return res.status(400).json({
            ok: false,
            msg: 'No es un medico, usuario u hospital'
        });
    }

    // Validar que exista un archivo
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({
            ok: false,
            msg: 'No files were uploaded.'

        });
    }

    // Procesar la imagen
    const file = req.files.imagen;

    const nombreCortado = file.name.split('.');
    const extensionArchivo = nombreCortado[nombreCortado.length - 1];

    //Validar estension permitida
    const extensionesValidas = ['png', 'jpg', 'jpeg', 'gif'];
    if (!extensionesValidas.includes(extensionArchivo)) {
        return res.status(400).json({
            ok: false,
            msg: 'No es una extension permitida'
        });
    }

    // Generar el nombre del archivo
    const nombreArchivo = `${uuidv4()}.${extensionArchivo}`;

    // Crear el path para guardar imagen
    const path = `./uploads/${tipo}/${nombreArchivo}`;

    // Use the mv() method to place the file somewhere on your server
    file.mv(path, (err) => {
        if (err) {
            console.log(err);
            return res.status(500).json({
                ok: false,
                msg: 'Error al mover la imagen'
            });
        }

        // Actualizar base de datos 
        actualizaImagen(tipo, id, nombreArchivo);



        res.json({
            ok: true,
            msg: 'File uploaded!',
            nombreArchivo
        });

    });



};

const retornaImagen = async(req = request, res = response) => {


    const tipo = req.params.tipo;
    const imagen = req.params.imagen;
    const pathImg = path.join(__dirname, `../uploads/${tipo}/${imagen}`);

    // Imagen por defecto

    if (fs.existsSync(pathImg)) {
        res.sendFile(pathImg);
    } else {
        const pathImg = path.join(__dirname, `../uploads/no-img.png`);
        res.sendFile(pathImg);
    }




};

module.exports = {
    fileUpload,
    retornaImagen
};