const express = require('express');
const flash = require('express-flash');
const session = require('express-session');
const passport = require('passport');
const cookieParser = require('cookie-parser');
const path = require('path');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');

const app = express();
app.use(express.json());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'views')));
app.use('/views', express.static(path.join(__dirname, 'views')));
app.use('/controllers', express.static(path.join(__dirname, 'controllers')));

app.use(express.urlencoded({ extended: true }));
app.use(cookieParser('mi secreto'));
app.use(session({
    secret: 'mi secreto',
    resave: true,
    saveUninitialized: true
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

// Ruta de autenticacion
const authRoutes = require('./routes/authRoutes');
app.use('/', authRoutes);

// Ruta de inicio
const indexRoutes = require('./routes/indexRoutes');
app.use('/', indexRoutes);

// USUARIOS
const UsuariosRoutes = require('./routes/usuariosRoutes');
app.use('/usuarios', UsuariosRoutes);

// APARTAMENTOS
const ApartamentosRoutes = require('./routes/apartamentosRoutes');
app.use('/apartamentos', ApartamentosRoutes);

// ROLES
const RolesRoutes = require('./routes/rolesRoutes');
app.use('/roles', RolesRoutes);

// HORARIOS
const HorariosRoutes = require('./routes/horariosRoutes');
app.use('/horarios', HorariosRoutes);

// ESCENARIOS DEPORTIVOS
const EscenariosDeportivosRoutes = require('./routes/escenariosDeportivosRoutes');
app.use('/escenariosDeportivos', EscenariosDeportivosRoutes);

// RESERVAS
const ReservasRoutes = require('./routes/reservasRoutes');
app.use('/reservas', ReservasRoutes);

// DISPONIBILIDADES
const DisponibilidadesRoutes = require('./routes/disponibilidadesRoutes');
app.use('/Disponibilidades', DisponibilidadesRoutes);

// REGISTRO
const registerRoutes = require('./routes/registerRoutes');
app.use('/', registerRoutes);

// Puerto e inicio
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});
