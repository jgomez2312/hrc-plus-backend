const mongoose = require('mongoose');

const dbConn = async() => {


    try {
        mongoose.connect(process.env.DB_CNN, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        });

        console.log('DB online');

    } catch (error) {
        console.log(error);
        throw new Error('Error al levantar la DB');
    }



};

module.exports = {
    dbConn
};