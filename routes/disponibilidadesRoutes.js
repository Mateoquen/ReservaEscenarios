const express = require('express');
const router = express.Router();
const ensureAuthenticated = require('../middlewares/auth');
const DisponibilidadesController = require('../controllers/disponibilidadesController');
const ReservasController = require('../controllers/reservasController');

router.get('/', ensureAuthenticated, DisponibilidadesController.mostrarTodos);
router.get('/:idEscenario', ensureAuthenticated, ReservasController.obtenerDisponibilidades);

module.exports = router;
