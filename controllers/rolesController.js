// controllers/usuariosController.js
const Rol = require('../models/Rol');
const path = require('path');

class rolesController {
  static async mostrarTodos(req, res) {
    try {
      const roles = await Rol.obtenerTodos();
      res.render(path.join(__dirname, '..', 'views', 'roles'), { roles });
    } catch (error) {
      res.status(500).send('Error al obtener roles desde la base de datos');
    }
  }

  static async mostrarRol(req, res) {
    try {
      const rol = await Rol.obtenerPorId(req.params.id);
      if (!rol) {
        res.status(404).send('rol no encontrado');
        return;
      }
      res.render('rol/detalles', { rol });
    } catch (error) {
      res.status(500).send('Error al obtener rol desde la base de datos');
    }
  }

  static async agregarRol(req, res) {
    try {
      const { nombre, administrador } = req.body;
      const nuevoRol = new Rol(nombre, administrador);
      await nuevoRol.guardar();
      res.redirect('/roles');
    } catch (error) {
      res.status(500).send('Error al agregar rol a la base de datos');
    }
  }

  static async actualizarRol(req, res) {
    try {
      const { nombre, administrador } = req.body;
      const rol = new Rol(nombre, administrador);
      rol.id = req.params.id;
      await rol.actualizar();
      res.redirect('/roles');
    } catch (error) {
      res.status(500).send('Error al actualizar rol en la base de datos');
    }
  }

  static async eliminarRol(req, res) {
    try {
      const rol = new Rol();
      rol.id = req.params.id;
      await rol.eliminar();
      res.redirect('/roles');
    } catch (error) {
      res.status(500).send('Error al eliminar rol de la base de datos');
    }
  }
  static async generarInformeRoles(req, res) {
    try {
        const informeRoles = await Rol.obtenerTodos();
        const PDFDocument = require('pdfkit');
        const doc = new PDFDocument();
        doc.pipe(res);

        doc.fontSize(12).text('Informe de Roles:', { align: 'left' });

        informeRoles.forEach(rol => {
            doc.text(`• Nombre rol: ${rol.nombre}, Administrador: ${rol.administrador}`);
        });

        doc.end(); 
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al generar el informe de Roles');
    }
  }
}

module.exports = rolesController;
