const express = require('express');
const router = express.Router();
const ensureAuthenticated = require('../middlewares/auth');
const RolesController = require('../controllers/rolesController');

router.get('/', ensureAuthenticated, RolesController.mostrarTodos);
router.post('/agregar', ensureAuthenticated, RolesController.agregarRol);
router.post('/actualizar/:id', ensureAuthenticated, RolesController.actualizarRol);
router.get('/eliminar/:id', ensureAuthenticated, RolesController.eliminarRol);

module.exports = router;
