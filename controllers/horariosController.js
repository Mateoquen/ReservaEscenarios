const express = require('express');
const path = require('path');
const rest = require('../public/config');


const mostrarHorario = async (req, res) => {
    try {
        const Horarios = await getHorario();
        res.render('Horarios', {Horarios});
    } catch (error) {
        console.error('Error al mostrar el Horario:', error.message);
        res.status(500).json({ error: 'Error al mostrar el Horario' });
    }
};

const createHorario = async (horario) => {
    try {
   
        console.log(horario)
        const query = "INSERT INTO Horarios (nombre,horaInicial,horaFinal) VALUES (@nombre,@horaInicial,@horaFinal)";
        const result = await rest.executeQuery(query, [{name:'nombre', type: 'varchar', value:horario.nombre},
        {name:'horaInicial', type: 'time', value:horario.horaInicial},
        {name:'horaFinal', type: 'time', value:horario.horaFinal}
        ]);
        return result;
    } catch (error) {
        throw error;
    }
};

async function getHorario() {
    try {
        const query = " select idHorario,nombre,substring(convert(varchar, horaInicial), 1, 5) as horaInicial,substring(convert(varchar, horaFinal), 1, 5)  as horaFinal from horarios ";
        const result = await rest.executeQuery(query);
        return result.data;
    } catch (error) {
        console.error('Error al obtener los horarios :', error.message);
        throw error;
    }
} 

const updateHorario = async (req, res) => {
  console.log(req)
  const idHorario = req.params.id;
  const nombre = req.body.numeroApto;
  const horaInicial = req.body.numeroTorre;
  const horaFinal = req.body.estado;
  try {
    console.log(req)
      const query = 'UPDATE Hoarios SET nombre=@nombre, horaInicial=@horaInicial, horaFinal=@horaFinal WHERE idHorario=@idHorario';
      const result = await rest.executeQuery(query, [{name:'nombre', type: 'varchar', value:nombre},
        {name:'horaInicial', type: 'time', value:horaInicial},
        {name:'horaFinal', type: 'time', value:horaFinal},
        {name:'idHorario', type: 'int', value:idHorario},
      ]);
      
      res.json({ success: true, data: result });
  } catch (error) {
      res.status(500).json({ success: false, error: error.message });
  }
};

const deleteHorario = async (id) => {
    try {
        const query = 'DELETE FROM Horarios WHERE idHorario=@idHorario';
        const result = await rest.executeQuery(query, [{name:'idHorario', type: 'int', value:id}]);
        return result;
    } catch (error) {
        throw error;
    }
};

module.exports = {
    mostrarHorario,
    createHorario,
    getHorario,
    updateHorario,
    deleteHorario,
};
