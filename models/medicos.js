const { Schema, model, SchemaTypes } = require('mongoose');

const MedicoSchema = Schema({

    nombre: {
        type: String,
        required: true
    },
    img: {
        type: String
    },
    usuario: {
        requiered: true,
        type: SchemaTypes.ObjectId,
        ref: 'Usuario'
    },
    hospital: {
        requiered: true,
        type: SchemaTypes.ObjectId,
        ref: 'Hospital'
    }

}, );

MedicoSchema.method('toJSON', function() {
    const { __v, _id, ...object } = this.toObject();


    object.uid = _id;
    return object;
});


module.exports = model('Medico', MedicoSchema);