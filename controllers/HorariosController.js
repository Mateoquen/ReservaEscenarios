const Horario = require('../models/Horario');

// Importar los módulos necesarios

// Controlador para obtener todos los horarios
exports.getHorarios = async (req, res) => {
    try {
        const horarios = await Horario.find();
        res.json(horarios);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener los horarios' });
    }
};

// Controlador para crear un nuevo horario
exports.createHorario = async (req, res) => {
    try {
        const { fecha, horaInicio, horaFin, escenario } = req.body;
        const horario = new Horario({ fecha, horaInicio, horaFin, escenario });
        await horario.save();
        res.status(201).json(horario);
    } catch (error) {
        res.status(500).json({ error: 'Error al crear el horario' });
    }
};

// Controlador para actualizar un horario existente
exports.updateHorario = async (req, res) => {
    try {
        const { fecha, horaInicio, horaFin, escenario } = req.body;
        const horario = await Horario.findByIdAndUpdate(req.params.id, { fecha, horaInicio, horaFin, escenario }, { new: true });
        res.json(horario);
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar el horario' });
    }
};

// Controlador para eliminar un horario existente
exports.deleteHorario = async (req, res) => {
    try {
        await Horario.findByIdAndDelete(req.params.id);
        res.json({ message: 'Horario eliminado correctamente' });
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar el horario' });
    }
};