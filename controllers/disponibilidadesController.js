// controllers/usuariosController.js
const Disponibilidad = require('../models/Disponibilidad');
const path = require('path');

class disponibilidadesController {
  static async mostrarTodos(req, res) {
    try {

      const disponibilidades = await Disponibilidad.obtenerTodos();
      res.render(path.join(__dirname, '..', 'views', 'disponibilidades'), { disponibilidades, isAdmin: req.user.isAdmin });
    } catch (error) {
      res.status(500).send('Error al obtener disponibilidades desde la base de datos');
    }
  }

  static async mostrarDisponibilidad(req, res) {
    try {
      const disponibilidad = await Disponibilidad.obtenerPorId(req.params.id);
      if (!disponibilidad) {
        res.status(404).send('disponibilidad no encontrado');
        return;
      }
      res.render('disponibilidad/detalles', { disponibilidad });
    } catch (error) {
      res.status(500).send('Error al obtener disponibilidad desde la base de datos');
    }
  }
  static async generarInformeDisponibilidades(req, res) {
    try {
      const informeDisponibilidades = await Disponibilidad.obtenerTodos();
      const PDFDocument = require('pdfkit');
      const doc = new PDFDocument();
      doc.pipe(res);

      doc.fontSize(12).text('Informe de disponibilidades', { align: 'left' });

      informeDisponibilidades.forEach(disponibilidad => {
        doc.text(`• Escenario: ${disponibilidad.nombre},Año: ${disponibilidad.año}, Mes: ${disponibilidad.mes}, dia: ${disponibilidad.dia}, Hora: ${disponibilidad.hora}`);
      });

      doc.end();
    } catch (error) {
      console.error(error);
      res.status(500).send('Error al generar el informe de disponibilidades');
    }
  }
}

module.exports = disponibilidadesController;
