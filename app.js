const express = require('express');
const session = require('express-session');
const flash = require('connect-flash');
const path = require('path');
const passport = require('passport'); 



const app = express();
const PORT = 3000;

// Configuración de Express
app.use(express.json());
app.set('views', path.join(__dirname, 'views'));
app.use('/views', express.static(path.join(__dirname, 'views')));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));
app.use('/public', express.static(path.join(__dirname, 'public')));

// Configuración de session y flash
app.use(session({ secret: 'your-secret-key', resave: true, saveUninitialized: true }));
app.use(flash());

// Configuración de Passport.js
app.use(passport.initialize());
app.use(passport.session());

// Rutas
//AUTH
const authController = require('./controllers/authController');
app.get('/Auth', authController.mostrarAuth);
//USUARIOS
const usuarioController = require('./controllers/usuarioController');
app.get('/Usuario', usuarioController.mostrarUsuario);
app.post('/Usuario', (req, res) => {
  usuarioController.createUsuario(req.body)
      .then(result => res.json(result))
      .catch(error => res.status(500).json({ error: error.message }));
});
app.put('/Usuario/:id', usuarioController.updateUsuario)
app.delete('/Usuario/:id', (req, res) => {
  const idUsuario = req.params.id;
  console.log(idUsuario)
  usuarioController.deleteUsuario(idUsuario)
      .then(result => res.json(result))
      .catch(error => res.status(500).json({ error: error.message }));
});
//ROLES
const rolesController = require('./controllers/rolesController');
app.get('/Roles', rolesController.mostrarRol);
app.post('/Roles', (req, res) => {
  rolesController.createRol(req.body)
      .then(result => res.json(result))
      .catch(error => res.status(500).json({ error: error.message }));
});
app.put('/Roles/:id', rolesController.updateRol)
app.delete('/Roles/:id', (req, res) => {
  const idRol = req.params.id;
  console.log(idRol)
  rolesController.deleteRol(idRol)
      .then(result => res.json(result))
      .catch(error => res.status(500).json({ error: error.message }));
});

//ESCENARIO DEPORTIVOS
const escenarioController = require('./controllers/escenarioController');
app.get('/Escenarios', escenarioController.mostrarEscenario);
app.post('/Escenarios', (req, res) => {
  escenarioController.createEscenario(req.body)
      .then(result => res.json(result))
      .catch(error => res.status(500).json({ error: error.message }));
});
app.put('/Escenarios/:id', escenarioController.updateEscenario)
app.delete('/Escenarios/:id', (req, res) => {
  const idEscenario = req.params.id;
  console.log(idEscenario)
  escenarioController.deleteEscenario(idEscenario)
      .then(result => res.json(result))
      .catch(error => res.status(500).json({ error: error.message }));
});

//APARTAMENTOS
const apartamentosController = require('./controllers/apartamentosController');
app.get('/Apartamentos', apartamentosController.mostrarApto);
app.post('/Apartamentos', (req, res) => {
  apartamentosController.createApto(req.body)
      .then(result => res.json(result))
      .catch(error => res.status(500).json({ error: error.message }));
});
app.put('/Apartamentos/:id', apartamentosController.updateApto)
app.delete('/Apartamentos/:id', (req, res) => {
  const idApartamento = req.params.id;
  console.log(idApartamento)
  apartamentosController.deleteApto(idApartamento)
      .then(result => res.json(result))
      .catch(error => res.status(500).json({ error: error.message }));
});

//HORARIOS
const horariosController = require('./controllers/horariosController');
app.get('/Horarios', horariosController.mostrarHorario);
app.post('/Horarios', (req, res) => {
  horariosController.createHorario(req.body)
      .then(result => res.json(result))
      .catch(error => res.status(500).json({ error: error.message }));
});
app.put('/Horarios/:id', horariosController.updateHorario)
app.delete('/Horarios/:id', (req, res) => {
  const idHorario = req.params.id;
  console.log(idHorario)
  horariosController.deleteHorario(idHorario)
      .then(result => res.json(result))
      .catch(error => res.status(500).json({ error: error.message }));
});

//RESERVAS
const reservaController = require('./controllers/reservaController');
app.get('/Reserva', reservaController.mostrarReserva);
app.post('/Reserva', (req, res) => {
  reservaController.createReserva(req.body)
      .then(result => res.json(result))
      .catch(error => res.status(500).json({ error: error.message }));
});
app.put('/Reserva/:id', reservaController.updateReserva)
app.delete('/Reserva/:id', (req, res) => {
  const idReserva = req.params.id;
  console.log(idReserva)
  reservaController.deleteReserva(idReserva)
      .then(result => res.json(result))
      .catch(error => res.status(500).json({ error: error.message }));
});

//DISPONIBILIDADES
const disponibilidadesController = require('./controllers/disponibilidadesController');
app.get('/Disponibilidades', disponibilidadesController.mostrarDisponibilidad);


// Ruta para la página principal
app.get('/', (req, res) => {
   res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
