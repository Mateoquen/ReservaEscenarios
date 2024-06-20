const express = require('express');
const router = express.Router();
const ensureAuthenticated = require('../middlewares/auth');
const ReservasController = require('../controllers/reservasController');

router.get('/', ensureAuthenticated, ReservasController.mostrarTodos);
router.post('/agregar', ensureAuthenticated, ReservasController.agregarReserva);
router.post('/actualizar/:id', ensureAuthenticated, ReservasController.actualizarReservas);
router.get('/eliminar/:id', ensureAuthenticated, ReservasController.eliminarReservas);

module.exports = router;
