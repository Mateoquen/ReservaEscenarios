const express = require('express');
const router = express.Router();
const ensureAuthenticated = require('../middlewares/auth');
const ApartamentosController = require('../controllers/apartamentosController');

router.get('/', ensureAuthenticated, ApartamentosController.mostrarTodos);
router.post('/agregar', ensureAuthenticated, ApartamentosController.agregarApartamento);
router.post('/actualizar/:id', ensureAuthenticated, ApartamentosController.actualizarApartamento);
router.get('/eliminar/:id', ensureAuthenticated, ApartamentosController.eliminarApartamento);

module.exports = router;
