const escenarioDeportivo = require('../models/escenarioDeportivo');
const Horario = require('../models/Horario');
const path = require('path');

class escenariosDeportivosController {
    static async mostrarTodos(req, res) {
        try {
            const escenariosDeportivos = await escenarioDeportivo.obtenerTodos();
            const horarios = await Horario.obtenerTodos();
            res.render(path.join(__dirname, '..', 'views', 'escenarioDeportivo'), { escenariosDeportivos, horarios });
        } catch (error) {
            console.error(error);
            res.status(500).send('Error al obtener escenarios deportivos desde la base de datos');
        }
    }

    static async agregarEscenarioDeportivo(req, res) {
        try {
            const { nombre} = req.body;
            const escenarioDeportivo = new escenarioDeportivo(nombre);
            await escenarioDeportivo.guardar();
            res.redirect('/escenariosDeportivos');
        } catch (error) {
            res.status(500).send('Error al agregar escenario deportivo a la base de datos');
        }
     
    }

    static async actualizarEscenarioDeportivo(req, res) {
       const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        try {
            const { nombre } = req.body;
            const escenarioDeportivo = new escenarioDeportivo(nombre);
            escenarioDeportivo.id = req.params.id;
            await escenarioDeportivo.actualizar();
            res.redirect('/escenariosDeportivos');
        } catch (error) {
            console.error(error);
            res.status(500).send('Error al actualizar escenario deportivo en la base de datos');
        }

        
    }

    static async eliminarEscenarioDeportivo(req, res) {
        try {
            const escenarioDeportivo = new escenarioDeportivo();
            escenarioDeportivo.id = req.params.id;
            await escenarioDeportivo.eliminar();
            res.redirect('/escenariosDeportivos');
        } catch (error) {
            console.error(error);
            res.status(500).send('Error al eliminar escenario deportivo en la base de datos');
        }
    }
       
}
module.exports = escenariosDeportivosController;