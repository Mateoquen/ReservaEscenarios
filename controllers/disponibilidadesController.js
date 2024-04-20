const express = require('express');
const path = require('path');
const rest = require('../public/config');

const ITEMS_PER_PAGE = 10;

const mostrarDisponibilidad = async (req, res) => {
    try {
        const page = req.query.page || 1;
        const Disponibilidades = await getDisponibilidades(page);
        const totalDisponibilidades = await getTotalDisponibilidades();

        const totalPages = Math.ceil(totalDisponibilidades / ITEMS_PER_PAGE);

        res.render('Disponibilidades', { Disponibilidades, currentPage: page, totalPages });
    } catch (error) {
        console.error('Error al mostrar Disponibilidad:', error.message);
        res.status(500).json({ error: 'Error al mostrar Disponibilidad' });
    }
};

async function getDisponibilidades(page) {
    try {
        const offset = (page - 1) * ITEMS_PER_PAGE;
        const query = `
            SELECT idDisponibilidad, b.nombre, mes, dia, substring(convert(varchar, hora), 1, 5) as hora
            FROM disponibilidades a
            INNER JOIN escenariosDeportivos b ON a.idEscenario = b.idEscenario
            ORDER BY nombre, mes, dia, hora ASC
            OFFSET ${offset} ROWS FETCH NEXT ${ITEMS_PER_PAGE} ROWS ONLY
        `;
        const result = await rest.executeQuery(query);
        return result.data;
    } catch (error) {
        console.error('Error al obtener las disponibilidades:', error.message);
        throw error;
    }
}

async function getTotalDisponibilidades() {
    try {
        const query = 'SELECT COUNT(*) as totalCount FROM disponibilidades';
        const result = await rest.executeQuery(query);
        return result.data[0][0].totalCount;
    } catch (error) {
        console.error('Error al obtener el número total de disponibilidades:', error.message);
        throw error;
    }
}

module.exports = {
    mostrarDisponibilidad,
};
