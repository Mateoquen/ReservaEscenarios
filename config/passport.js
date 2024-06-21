const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const Usuario = require('../models/Usuario');

passport.use(new LocalStrategy(
    async function(username, password, done) {
        try {
            const usuario = await Usuario.obtenerPorNombre(username);
            if (!usuario) {
                return done(null, false, { message: 'Usuario no encontrado' });
            }
            const match = await bcrypt.compare(password, usuario.clave);
            if (!match) {
                return done(null, false, { message: 'Contraseña incorrecta' });
            }            
            return done(null, usuario);
        } catch (err) {
            return done(err);
        }
    }
));

passport.serializeUser(function(usuario, done) {
    done(null, { id: usuario.idUsuario, isAdmin: usuario.administrador === true });
});

passport.deserializeUser(async function(serializedUser, done) {
    try {
        const usuario = await Usuario.obtenerPorId(serializedUser.id);
        done(null, {usuario, isAdmin: usuario.administrador === true });
    } catch (err) {
        done(err);
    }
});

module.exports = passport;
