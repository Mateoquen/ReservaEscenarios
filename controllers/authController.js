const express = require('express');
const path = require('path');
const rest = require('../public/config');


const mostrarAuth = async (req, res) => {
    try {
        const usuarios= await getAuth();
        res.render('auth', { usuarios });
    } catch (error) {
        console.error('Error al mostrar auth:', error.message);
        res.status(500).json({ error: 'Error al mostrar auth' });
    }
};


async function getAuth() {
    try {
        const query = " select idusuario,nombre,clave from usuarios";
        const result = await rest.executeQuery(query);
        return result.data;
    } catch (error) {
        console.error('Error al obtener las Autorizaciones :', error.message);
        throw error;
    }
} 


module.exports = {
  mostrarAuth,
};
