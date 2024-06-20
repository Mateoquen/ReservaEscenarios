const express = require('express');
const router = express.Router();
const ensureAuthenticated = require('../middlewares/auth');
const UsuariosController = require('../controllers/usuariosController');

router.get('/', ensureAuthenticated, UsuariosController.mostrarTodos);
router.post('/agregar', ensureAuthenticated, UsuariosController.agregarUsuario);
router.post('/actualizar/:id', ensureAuthenticated, UsuariosController.actualizarUsuario);
router.get('/eliminar/:id', ensureAuthenticated, UsuariosController.eliminarUsuario);
router.get('/informe', ensureAuthenticated,UsuariosController.generarInformeUsuarios);

module.exports = router;
