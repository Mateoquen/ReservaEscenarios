const EscenarioDeportivo = require('../models/EscenarioDeportivo');
const escenarioDeportivo = require('../models/EscenarioDeportivo');
const Horario = require('../models/Horario');
const path = require('path');

class escenariosDeportivosController {
    static async mostrarTodos(req, res) {
        try {
            const escenariosDeportivos = await escenarioDeportivo.obtenerTodos();
            const horarios = await Horario.obtenerTodos();
            res.render(path.join(__dirname, '..', 'views', 'escenariosDeportivos'), { escenariosDeportivos, horarios });
        } catch (error) {
            console.error(error);
            res.status(500).send('Error al obtener escenarios deportivos desde la base de datos');
        }
    }

    static async agregarEscenarioDeportivo(req, res) {
       
        try {
            const {nombre,idHorario} = req.body;
            const nuevoescenarioDeportivo = new escenarioDeportivo(nombre,idHorario);
            await nuevoescenarioDeportivo.guardar();
            res.redirect('/escenariosDeportivos');
        } catch (error) {
            res.status(500).send('Error al agregar escenario deportivo a la base de datos');
        }
     
    }

    static async actualizarEscenarioDeportivo(req, res) {
        try {
            const { nombre,idHorario } = req.body;
            const nuevoescenarioDeportivo = new escenarioDeportivo(nombre,idHorario);
            nuevoescenarioDeportivo.id = req.params.id;
            await nuevoescenarioDeportivo.actualizar();
            res.redirect('/escenariosDeportivos');
        } catch (error) {
            console.error(error);
            res.status(500).send('Error al actualizar escenario deportivo a la base de datos');
        }

        
    }

    static async eliminarEscenarioDeportivo(req, res) {
        try {
            const nuevoescenarioDeportivo = new escenarioDeportivo();
            nuevoescenarioDeportivo.id = req.params.id;
            await nuevoescenarioDeportivo.eliminar();
            res.redirect('/escenariosDeportivos');
        } catch (error) {
            console.error(error);
            res.status(500).send('Error al eliminar escenario deportivo a la base de datos');
        }
    }
     
    static async generarInformeEscenarioDeportivo(req, res) {
        try {
            const informeEscenarios = await EscenarioDeportivo.obtenerTodos();
            const PDFDocument = require('pdfkit');
            const doc = new PDFDocument();
            doc.pipe(res);
    
            doc.fontSize(12).text('Informe de Escenarios Deportivos:', { align: 'left' });
    
            informeEscenarios.forEach(escenario => {
                doc.text(`• Nombre: ${escenario.nombreEscenario},horario: ${escenario.nombreHorario}`);
            });
    
            doc.end(); 
        } catch (error) {
            console.error(error);
            res.status(500).send('Error al generar el informe de escenarios deportivos');
        }
      }

}
module.exports = escenariosDeportivosController;