const express = require('express');
const router = express.Router();
const ensureAuthenticated = require('../middlewares/auth');
const EscenariosDeportivosController = require('../controllers/escenariosDeportivosController');

router.get('/', ensureAuthenticated, EscenariosDeportivosController.mostrarTodos);
router.post('/agregar', ensureAuthenticated, EscenariosDeportivosController.agregarEscenarioDeportivo);
router.post('/actualizar/:id', ensureAuthenticated, EscenariosDeportivosController.actualizarEscenarioDeportivo);
router.get('/eliminar/:id', ensureAuthenticated, EscenariosDeportivosController.eliminarEscenarioDeportivo);

module.exports = router;
