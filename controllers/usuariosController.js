const Usuario = require('../models/Usuario');
const Rol = require('../models/Rol');
const Apartamento = require('../models/Apartamento');
const TipoIdentificacion = require('../models/TipoIdentificacion')

const path = require('path');
const { validationResult } = require('express-validator');
const bcrypt = require('bcrypt');

class UsuariosController {
  static async mostrarTodos(req, res) {
    try {
      const usuarios = await Usuario.obtenerTodos();
      const rolesOptions = await Rol.obtenerTodos();
      const apartamentosOptions = await Apartamento.obtenerTodos();
      const tipoIdOptions = await TipoIdentificacion.obtenerTodos();
      res.render(path.join(__dirname, '..', 'views', 'usuarios'), { usuarios, rolesOptions, apartamentosOptions,tipoIdOptions });
    } catch (error) {
      console.error(error);
      res.status(500).send('Error al obtener usuarios desde la base de datos');
    }
  }


  static async agregarUsuario(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    console.log(req.body)
    try {
      const { idTipoId,identificacion,nombre, clave, idRol, idApartamento } = req.body;
      const hashedPassword = await bcrypt.hash(clave, 10); // Hash de la contraseña
      const nuevoUsuario = new Usuario(idTipoId,identificacion,nombre, hashedPassword, idRol, idApartamento); // Usar la contraseña hasheada
      await nuevoUsuario.guardar();
      res.redirect('/usuarios');
    } catch (error) {
      console.error(error);
      res.status(500).send('Error al agregar usuario a la base de datos');
    }
  }

  static async actualizarUsuario(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { idTipoId,identificacion,nombre, clave, idRol, idApartamento } = req.body;
      const hashedPassword = await bcrypt.hash(clave, 10); // Hash de la nueva contraseña
      const usuario = new Usuario(idTipoId,identificacion,nombre, hashedPassword, idRol, idApartamento); // Usar la contraseña hasheada
      usuario.id = req.params.id;
      await usuario.actualizar();
      res.redirect('/usuarios');
    } catch (error) {
      console.error(error);
      res.status(500).send('Error al actualizar usuario en la base de datos');
    }
  }

  static async eliminarUsuario(req, res) {
    try {
      const usuario = new Usuario();
      usuario.id = req.params.id;
      await usuario.eliminar();
      res.redirect('/usuarios');
    } catch (error) {
      console.error(error);
      res.status(500).send('Error al eliminar usuario de la base de datos');
    }
  }
  static async generarInformeUsuarios(req, res) {
    try {
        const informeUsuarios = await Usuario.obtenerTodos();
        const PDFDocument = require('pdfkit');
        const doc = new PDFDocument();
        doc.pipe(res);

        doc.fontSize(12).text('Informe de Usuarios', { align: 'left' });

        informeUsuarios.forEach(usuario => {
            doc.text(`• Nombre: ${usuario.nombre},Tipo Id: ${usuario.nombreTipoId}, Identificación: ${usuario.identificacion}, Rol: ${usuario.nombreRol}, Apartamento: ${usuario.nombreApartamento}`);
        });

        doc.end(); 
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al generar el informe de usuarios');
    }
  }
}

module.exports = UsuariosController;
