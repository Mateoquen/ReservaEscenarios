const mongoose = require('mongoose');

// Importar los módulos necesarios

// Define the Horario schema
const horarioSchema = new mongoose.Schema({
    // Define your schema fields here
    day: {
        type: String,
        required: true
    },
    startTime: {
        type: String,
        required: true
    },
    endTime: {
        type: String,
        required: true
    },
    // agrega el campo escenario
});

// Creacion del horario
const Horario = mongoose.model('Horario', horarioSchema);

// Exportar el modelo
module.exports = Horario;