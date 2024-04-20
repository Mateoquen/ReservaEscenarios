// authMiddleware.js
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const { getUserByCredentials } = require('../controllers/authController');

passport.use(new LocalStrategy(
  async (username, password, done) => {
    try {
      const user = await getUserByCredentials(username, password);

      if (!user) {
        return done(null, false, { message: 'Credenciales incorrectas' });
      }

      return done(null, user);
    } catch (error) {
      return done(error);
    }
  }
));

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/Auth');
}

function isAdmin(req, res, next) {
  if (req.isAuthenticated() && req.user.isAdmin) {
    return next();
  }
  res.status(403).send('Acceso prohibido: Se requieren permisos de administrador');
}

function initializePassport() {
  return passport.initialize();
}

function sessionPassport() {
  return passport.session();
}

module.exports = {
  ensureAuthenticated,
  isAdmin,
  initializePassport,
  sessionPassport,
};
