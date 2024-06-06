const express = require('express');
const flash = require('express-flash');
const session = require('express-session');
const passport = require('passport');
const cookieParser = require('cookie-parser');
const path = require('path');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const ensureAuthenticated = require('./middlewares/auth'); 
require('./config/passport'); 

const Usuario = require('./models/Usuario'); 

const app = express();
app.use(express.json());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'views')));
app.use('/views', express.static(path.join(__dirname, 'views')));

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

/////////////////////RUTAS///////////////////////////
// Ruta de autenticacion
app.get("/Auth", (req, res) => {
    res.render("Auth");
});

//ruta para cerrar sesion
app.get('/logout', (req, res) => {
    req.logout(() => { 
        res.redirect('/Auth'); 
    });
});

// Ruta de registro
app.post('/register', async (req, res) => {
    const { nombreCompleto, password } = req.body; 
    try {
        const existingUser = await Usuario.obtenerPorNombre(nombreCompleto);
        if (existingUser) {
            // Si el usuario ya existe, renderizamos la vista Auth con el mensaje de error
            return res.render('Auth', { error: 'El usuario ya está registrado' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const nuevoUsuario = new Usuario(nombreCompleto, hashedPassword, null,null); 
        await nuevoUsuario.guardar(); 
        res.redirect('/Auth'); 
    } catch (error) {
        console.error('Error al registrar usuario:', error);
        res.status(500).send('Error al registrar usuario');
    }
});

// Ruta de autenticación con Passport
app.post("/Auth", passport.authenticate('local', {
    successRedirect: "/",
    failureRedirect: "/Auth",
    failureFlash: true // Habilita el uso de mensajes flash para errores de autenticación
}));

// Rutas protegidas
app.get("/", ensureAuthenticated, (req, res) => {
    res.render(path.join(__dirname, 'views', 'index.ejs'));
});

// USUARIOS
const UsuariosController = require('./controllers/usuariosController');
app.get('/usuarios', ensureAuthenticated, UsuariosController.mostrarTodos);
app.post('/usuarios/agregar', ensureAuthenticated, UsuariosController.agregarUsuario);
app.post('/usuarios/actualizar/:id', ensureAuthenticated, UsuariosController.actualizarUsuario);
app.get('/usuarios/eliminar/:id', ensureAuthenticated, UsuariosController.eliminarUsuario);

// Puerto e inicio
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});
