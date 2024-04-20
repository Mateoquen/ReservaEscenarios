const express = require('express');
const path = require('path');
const rest = require('../public/config');


const mostrarRol = async (req, res) => {
    try {
        const Roles = await getRol();
        res.render('Roles', {Roles});
    } catch (error) {
        console.error('Error al mostrar Rol:', error.message);
        res.status(500).json({ error: 'Error al mostrar Rol' });
    }
};


const createRol = async (roles) => {
    try {
        const query = "INSERT INTO Roles (nombre,administrador) VALUES (@nombre,@administrador)";
        const result = await rest.executeQuery(query, [{name:'nombre', type: 'varchar', value:roles.nombre},
        {name:'administrador', type: 'bit', value:roles.administrador}
        ]);
        return result;
    } catch (error) {
        throw error;
    }
};

async function getRol() {
    try {
        const query = "select idRol,nombre, case administrador when 1 then 'SI' else 'NO' end as administrador from roles";
        const result = await rest.executeQuery(query);
        return result.data;
    } catch (error) {
        console.error('Error al obtener los roles:', error.message);
        throw error;
    }
} 

const updateRol = async (req, res) => {
  console.log(req)
  const idRol = req.params.id;
  const nuevoNombre = req.body.nombre;
  const nuevoAdmon = req.body.administrador;
  try {
    console.log(req)
      const query = 'UPDATE Roles SET nombre=@nombre, administrador=@administrador WHERE idRol=@idRol';
      const result = await rest.executeQuery(query, [{name:'nombre', type: 'varchar', value:nuevoNombre},
        {name:'administrador', type: 'bit', value:nuevoAdmon},
        {name:'idRol', type: 'int', value:idRol},
      ]);
      
      res.json({ success: true, data: result });
  } catch (error) {
      res.status(500).json({ success: false, error: error.message });
  }
};

const deleteRol = async (id) => {
    try {
        const query = 'DELETE FROM Roles WHERE idRol=@idRol';
        const result = await rest.executeQuery(query, [{name:'idRol', type: 'int', value:id}]);
        return result;
    } catch (error) {
        throw error;
    }
};

module.exports = {
    mostrarRol,
    createRol,
    getRol,
    updateRol,
    deleteRol,
};
