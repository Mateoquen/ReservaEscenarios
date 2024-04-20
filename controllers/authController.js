// authController.js

const express = require('express');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const rest = require('../public/config');

const router = express.Router();

const mostrarAuth = async (req, res) => {
    try {
        const Auth  = await getAuth ();
        res.render('Auth', { Auth  });
    } catch (error) {
        console.error('Error al mostrar el inicio de sesion:', error.message);
        res.status(500).json({ error: 'Error al inicio de sesion' });
    }
};

async function getAuth() {
    try {
        const query = "select idUsuario,nombre,clave,idRol,idApartamento from usuarios ";
        const result = await rest.executeQuery(query);
        return result.data;
    } catch (error) {
        throw error;
    }
  }


// // Configuración de Passport.js
// passport.use(new LocalStrategy({
//   usernameField: 'email',
//   passwordField: 'password',
// }, (email, password, done) => {
//   // Implementa la lógica de autenticación aquí.
//   // Compara el email y la contraseña con tus datos de usuario en la base de datos.

//   // Ejemplo básico (no seguro):
//   if (email === 'usuario@example.com' && password === 'contraseña') {
//     return done(null, { id: 1, email: 'usuario@example.com' });
//   } else {
//     return done(null, false, { message: 'Credenciales incorrectas' });
//   }
// }));

// passport.serializeUser((user, done) => {
//   done(null, user.id);
// });

// passport.deserializeUser((id, done) => {
//   // Implementa la lógica para obtener el usuario desde la base de datos según el ID.
//   // En este ejemplo, devolvemos un usuario de demostración.
//   const user = { id: 1, email: 'usuario@example.com' };
//   done(null, user);
// });

// // Ruta para mostrar el formulario de inicio de sesión
// router.get('/Auth', (req, res) => {
//   res.render('Auth', { message: req.flash('error') });
// });
// // Ruta para manejar la autenticación usando Passport.js
// router.post('/Auth', passport.authenticate('local', {
//   successRedirect: '/', 
//   failureRedirect: '/Auth', 
//   failureFlash: true, 
// }));

// // Otras rutas relacionadas con la autenticación, como logout, registro, etc.

module.exports = {
  mostrarAuth,
};