const Usuario = require('../models/Usuario');
const Rol = require('../models/Rol');
const Apartamento = require('../models/Apartamento');
const path = require('path');
const { validationResult } = require('express-validator');
const bcrypt = require('bcrypt');

class UsuariosController {
  static async mostrarTodos(req, res) {
    try {
      const usuarios = await Usuario.obtenerTodos();
      const rolesOptions = await Rol.obtenerTodos();
      const apartamentosOptions = await Apartamento.obtenerTodos();
      res.render(path.join(__dirname, '..', 'views', 'usuarios'), { usuarios, rolesOptions, apartamentosOptions });
    } catch (error) {
      console.error(error);
      res.status(500).send('Error al obtener usuarios desde la base de datos');
    }
  }

  static async mostrarUsuario(req, res) {
    try {
      const usuario = await Usuario.obtenerPorId(req.params.id);
      if (!usuario) {
        return res.status(404).send('Usuario no encontrado');
      }
      res.render('usuarios/detalles', { usuario });
    } catch (error) {
      console.error(error);
      res.status(500).send('Error al obtener usuario desde la base de datos');
    }
  }

  static async agregarUsuario(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { nombre, clave, idRol, idApartamento } = req.body;
      const hashedPassword = await bcrypt.hash(clave, 10); // Hash de la contraseña
      const nuevoUsuario = new Usuario(nombre, hashedPassword, idRol, idApartamento); // Usar la contraseña hasheada
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
      const { nombre, clave, idRol, idApartamento } = req.body;
      const hashedPassword = await bcrypt.hash(clave, 10); // Hash de la nueva contraseña
      const usuario = new Usuario(nombre, hashedPassword, idRol, idApartamento); // Usar la contraseña hasheada
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
}

module.exports = UsuariosController;
