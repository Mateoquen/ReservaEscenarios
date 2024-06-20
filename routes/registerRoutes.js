const express = require('express');
const router = express.Router();
const Usuario = require('../models/Usuario');
const bcrypt = require('bcrypt');

// Ruta para el registro de usuarios
router.post('/register', async (req, res) => {
    const { idTipoId, identificacion, nombreCompleto, password } = req.body;
    try {
        const existingUser = await Usuario.obtenerPorNombre(nombreCompleto);
        if (existingUser) {
            return res.render('Auth', { error: 'El usuario ya está registrado' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const nuevoUsuario = new Usuario(idTipoId, identificacion, nombreCompleto, hashedPassword, null, null);
        await nuevoUsuario.guardar();
        res.redirect('/Auth');
    } catch (error) {
        console.error('Error al registrar usuario:', error);
        res.status(500).send('Error al registrar usuario');
    }
});

module.exports = router;
