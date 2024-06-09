const escenarioDeportivo = require('../models/escenarioDeportivo');
const path = require('path');

class escenariosDeportivosController {
    static async mostrarTodos(req, res) {
        try {
            const escenariosDeportivos = await escenarioDeportivo.obtenerTodos();
            res.render(path.join(__dirname, '..', 'views', 'escenariosDeportivos'), { escenariosDeportivos });
        } catch (error) {
            res.status(500).send('Error al obtener escenarios deportivos desde la base de datos');
        }
    }

    static async mostrarEscenarioDeportivo(req, res) {
        try {
            const escenarioDeportivo = await escenarioDeportivo.obtenerPorId(req.params.id);
            if (!escenarioDeportivo) {
                res.status(404).send('Escenario deportivo no encontrado');
                return;
            }
            res.render('escenarioDeportivo/detalles', { escenarioDeportivo });
        } catch (error) {
            res.status(500).send('Error al obtener escenario deportivo desde la base de datos');
        }
    }
    static async agregarEscenarioDeportivo(req, res) {
        try {
            const { nombre, tipo, capacidad, estado } = req.body;
            const nuevoEscenarioDeportivo = new escenarioDeportivo(nombre, tipo, estado);
            await nuevoEscenarioDeportivo.guardar();
            res.redirect('/escenariosDeportivos');
        } catch (error) {
            res.status(500).send('Error al agregar escenario deportivo a la base de datos');
        }
    }
    static async actualizarEscenarioDeportivo(req, res) {
        try {
            const { nombre, tipo, capacidad, estado } = req.body;
            const escenarioDeportivo = new escenarioDeportivo(nombre, tipo, estado);
            escenarioDeportivo.id = req.params.id;
            await escenarioDeportivo.actualizar();
            res.redirect('/escenariosDeportivos');
        } catch (error) {
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
            res.status(500).send('Error al eliminar escenario deportivo de la base de datos');
        }
    }

}
module.exports = escenariosDeportivosController;