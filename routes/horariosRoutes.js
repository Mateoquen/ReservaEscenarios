const express = require('express');
const router = express.Router();
const ensureAuthenticated = require('../middlewares/auth');
const HorariosController = require('../controllers/horariosController');

router.get('/', ensureAuthenticated, HorariosController.mostrarTodos);
router.post('/agregar', ensureAuthenticated, HorariosController.agregarHorario);
router.post('/actualizar/:id', ensureAuthenticated, HorariosController.actualizarHorario);
router.get('/eliminar/:id', ensureAuthenticated, HorariosController.eliminarHorario);
router.get('/informe', ensureAuthenticated,HorariosController.generarInformeHorarios);

module.exports = router;
