// controllers/usuariosController.js
const Apartamento = require('../models/Apartamento');
const path = require('path');

class apartamentosController {
  static async mostrarTodos(req, res) {
    try {
      const apartamentos = await Apartamento.obtenerTodos();
      res.render(path.join(__dirname, '..', 'views', 'apartamentos'), { apartamentos });
    } catch (error) {
      res.status(500).send('Error al obtener apartamento desde la base de datos');
    }
  }

  static async mostrarApartamento(req, res) {
    try {
      const apartamento = await Apartamento.obtenerPorId(req.params.id);
      if (!apartamento) {
        res.status(404).send('Apartamento no encontrado');
        return;
      }
      res.render('apartamento/detalles', { apartamento });
    } catch (error) {
      res.status(500).send('Error al obtener apartamento desde la base de datos');
    } 
  }

  static async agregarApartamento(req, res) {
    try {
      const { numeroApto,numeroTorre,estado } = req.body;
      const nuevoApartamento = new Apartamento(numeroApto,numeroTorre,estado);
      await nuevoApartamento.guardar();
      res.redirect('/apartamentos');
    } catch (error) {
      res.status(500).send('Error al agregar apartamento a la base de datos');
    }
  }

  static async actualizarApartamento(req, res) {
    try {
      const { numeroApto,numeroTorre,estado } = req.body;
      const apartamento = new Apartamento(numeroApto,numeroTorre,estado);
      apartamento.id = req.params.id;
      await apartamento.actualizar();
      res.redirect('/apartamentos');
    } catch (error) {
      res.status(500).send('Error al actualizar apartamento en la base de datos');
    }
  }

  static async eliminarApartamento(req, res) {
    try {
      const apartamento = new Apartamento();
      apartamento.id = req.params.id;
      await apartamento.eliminar();
      res.redirect('/apartamentos');
    } catch (error) {
      res.status(500).send('Error al eliminar apartamento de la base de datos');
    }
  }
}

module.exports = apartamentosController;
