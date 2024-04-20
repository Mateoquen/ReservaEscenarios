const express = require('express');
const path = require('path');
const rest = require('../public/config');


const mostrarEscenario = async (req, res) => {
    try {
        const Escenario  = await getEscenario ();
        const horariosOptions= await gethorariosOptions();
        res.render('Escenarios', { Escenario  , horariosOptions });
    } catch (error) {
        console.error('Error al mostrar el Escenario:', error.message);
        res.status(500).json({ error: 'Error al mostrar el Escenario' });
    }
};

async function gethorariosOptions() {
    try {
        const query = "SELECT idHorario, nombre FROM Horarios ";
        const result = await rest.executeQuery(query);
        return result.data;
    } catch (error) {
        throw error;
    }
  }


const createEscenario = async (escenario) => {
    try {
        const query = "INSERT INTO escenariosDeportivos (nombre,idHorario) VALUES (@nombre,@idHorario)";
        const result = await rest.executeQuery(query, [{name:'nombre', type: 'varchar', value:escenario.nombre},
        {name:'idHorario', type: 'int', value:escenario.idHorario},
        ]);
        const querySelector = "SELECT idEscenario FROM escenariosDeportivos where nombre= @nombre ";
        const resultselector = await rest.executeQuery(querySelector,[{name:'nombre', type: 'varchar', value:escenario.nombre}]);

        const querysp = "exec sp_insertarDisponibilidades @idEscenario";
        const resultsp = await rest.executeQuery(querysp, [{name:'idEscenario', type: 'bigint', value:resultselector.data[0][0].idEscenario}]);

        return result;
    } catch (error) {
        throw error;
    }
};

async function getEscenario() {
    try {
        const query = " select idEscenario,a.nombre , b.nombre as horario " +
                        " from escenariosDeportivos a " +
                        " inner join Horarios b on a.idHorario=b.idHorario ";
        const result = await rest.executeQuery(query);
        return result.data;
    } catch (error) {
        console.error('Error al obtener los Escenarios:', error.message);
        throw error;
    }
} 

const updateEscenario = async (req, res) => {
  console.log(req)
  const idEscenario = req.params.id;
  const nuevoNombre = req.body.nombre;
  const idHorario = req.body.idHorario;
  try {
    console.log(req)
      const query = 'UPDATE EscenariosDeportivos SET nombre=@nombre,idHorario=@idHorario  WHERE idEscenario=@idEscenario';
      const result = await rest.executeQuery(query, [{name:'nombre', type: 'varchar', value:nuevoNombre},
        {name:'idEscenario', type: 'int', value:idEscenario},
        {name:'idHorario', type: 'int', value:idHorario},
      ]);
      
      res.json({ success: true, data: result });
  } catch (error) {
      res.status(500).json({ success: false, error: error.message });
  }
};

const deleteEscenario = async (id) => {
    try {
        const query = 'DELETE FROM EscenariosDeportivos WHERE idEscenario=@idEscenario';
        const result = await rest.executeQuery(query, [{name:'idEscenario', type: 'int', value:id}]);
        const queryDispo = 'DELETE FROM disponibilidades WHERE idEscenario=@idEscenario';
        const resultDispo = await rest.executeQuery(queryDispo, [{name:'idEscenario', type: 'int', value:id}]);
        return result;
    } catch (error) {
        throw error;
    }
};

module.exports = {
    mostrarEscenario,
    createEscenario,
    getEscenario,
    updateEscenario,
    deleteEscenario,
};
