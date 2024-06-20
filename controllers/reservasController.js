const Reserva = require('../models/Reserva');
const Usuario = require('../models/Usuario');
const Escenario = require('../models/EscenarioDeportivo');
const Disponibilidad = require('../models/Disponibilidad');

const path = require('path');

class ReservasController {
  // Mostrar todas las reservas
  static async mostrarTodos(req, res) {
    try {
      const reservas = await Reserva.obtenerTodos();
      const usuarios = await Usuario.obtenerTodos();
      const escenarios = await Escenario.obtenerTodos();
      res.render(path.join(__dirname, '..', 'views', 'reservas'), { reservas, usuarios, escenarios });
    } catch (error) {
      console.error('Error al obtener reservas desde la base de datos:', error);
      res.status(500).send('Error al obtener reservas desde la base de datos');
    }
  }

  // Agregar una nueva reserva
  static async agregarReserva(req, res) {
    try {
      const { idUsuario, idEscenario, idDisponibilidad } = req.body;
      const nuevaReserva = new Reserva(idUsuario, idEscenario, idDisponibilidad);
      await nuevaReserva.guardar();
      res.redirect('/reservas');
    } catch (error) {
      console.error('Error al agregar reservas a la base de datos:', error);
      res.status(500).send('Error al agregar reservas a la base de datos');
    }
  }

  // Actualizar una reserva existente
  static async actualizarReservas(req, res) {
    try {
      const { idUsuario, idEscenario, idDisponibilidad } = req.body;
      const reserva = new Reserva(idUsuario, idEscenario, idDisponibilidad);
      reserva.id = req.params.id;
      await reserva.actualizar();
      res.redirect('/reservas');
    } catch (error) {
      console.error('Error al actualizar reservas en la base de datos:', error);
      res.status(500).send('Error al actualizar reservas en la base de datos');
    }
  }

  // Eliminar una reserva
  static async eliminarReservas(req, res) {
    try {
      const reserva = new Reserva();
      reserva.id = req.params.id;
      await reserva.eliminar();
      res.redirect('/reservas');
    } catch (error) {
      console.error('Error al eliminar reserva de la base de datos:', error);
      res.status(500).send('Error al eliminar reserva de la base de datos');
    }
  }

  static async obtenerDisponibilidades(req, res) {
    try {
      const idEscenario = req.params.idEscenario;
      const disponibilidades = await Disponibilidad.obtenerPorId(idEscenario);
      res.json(disponibilidades);
    } catch (error) {
      console.error(error);
      res.status(500).send('Error al obtener disponibilidades desde la base de datos');
    }
  }
  static async generarInformeReservas(req, res) {
    try {
        const informeReservas = await Reserva.obtenerTodos();
        const PDFDocument = require('pdfkit');
        const doc = new PDFDocument();
        doc.pipe(res);

        doc.fontSize(12).text('Informe de Reservas:', { align: 'left' });

        informeReservas.forEach(reserva => {
            doc.text(` Usuario: ${reserva.nombreUsuario}, Escenario deportivo: ${reserva.nombreEscenario}, fecha reserva: ${reserva.fechaReserva}`);
        });

        doc.end(); 
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al generar el informe de Reservas');
    }
  }

}

module.exports = ReservasController;
