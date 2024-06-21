// controllers/usuariosController.js
const Apartamento = require('../models/Apartamento');
const path = require('path');

class apartamentosController {
  static async mostrarTodos(req, res) {
    try {
      const isAdmin = req.isAuthenticated() && req.user.isAdmin;
      if (isAdmin == true) {
        const apartamentos = await Apartamento.obtenerTodos();
        res.render(path.join(__dirname, '..', 'views', 'apartamentos'), { apartamentos, isAdmin: req.user.isAdmin });
      } else {
        res.render("index", { isAdmin });
      }
    } catch (error) {
      res.status(500).send('Error al obtener apartamento desde la base de datos');
    }
  }

  static async mostrarApartamento(req, res) {
    try {
      const isAdmin = req.isAuthenticated() && req.user.isAdmin;
      if (isAdmin == true) {
        const apartamento = await Apartamento.obtenerPorId(req.params.id);
        if (!apartamento) {
          res.status(404).send('Apartamento no encontrado');
          return;
        }
        res.render('apartamento/detalles', { apartamento });
      } else {
        res.render("index", { isAdmin });
      }
    } catch (error) {
      res.status(500).send('Error al obtener apartamento desde la base de datos');
    }
  }

  static async agregarApartamento(req, res) {
    try {
      const isAdmin = req.isAuthenticated() && req.user.isAdmin;
      if (isAdmin == true) {
        const { numeroApto, numeroTorre, estado } = req.body;
        const nuevoApartamento = new Apartamento(numeroApto, numeroTorre, estado);
        await nuevoApartamento.guardar();
        res.redirect('/apartamentos');
      } else {
        res.render("index", { isAdmin });
      }
    } catch (error) {
      res.status(500).send('Error al agregar apartamento a la base de datos');
    }
  }

  static async actualizarApartamento(req, res) {
    try {
      const isAdmin = req.isAuthenticated() && req.user.isAdmin;
      if (isAdmin == true) {
        const { numeroApto, numeroTorre, estado } = req.body;
        const apartamento = new Apartamento(numeroApto, numeroTorre, estado);
        apartamento.id = req.params.id;
        await apartamento.actualizar();
        res.redirect('/apartamentos');
      } else {
        res.render("index", { isAdmin });
      }
    } catch (error) {
      res.status(500).send('Error al actualizar apartamento en la base de datos');
    }
  }

  static async eliminarApartamento(req, res) {
    try {
      const isAdmin = req.isAuthenticated() && req.user.isAdmin;
      if (isAdmin == true) {
        const apartamento = new Apartamento();
        apartamento.id = req.params.id;
        await apartamento.eliminar();
        res.redirect('/apartamentos');
      } else {
        res.render("index", { isAdmin });
      }
    } catch (error) {
      res.status(500).send('Error al eliminar apartamento de la base de datos');
    }
  }
  static async generarInformeApartamentos(req, res) {
    try {
      const informeApartamentos = await Apartamento.obtenerTodos();
      const PDFDocument = require('pdfkit');
      const doc = new PDFDocument();
      doc.pipe(res);

      doc.fontSize(12).text('Informe de Apartamentos', { align: 'left' });

      informeApartamentos.forEach(apartamento => {
        doc.text(`• Apartamento: ${apartamento.numeroapto},Torre: ${apartamento.numerotorre}, estado: ${apartamento.estado}`);
      });

      doc.end();
    } catch (error) {
      console.error(error);
      res.status(500).send('Error al generar el informe de apartamentos');
    }
  }
}

module.exports = apartamentosController;
