const express = require('express');
const path = require('path');
const rest = require('../public/config');


const mostrarUsuario = async (req, res) => {
    try {
        const Usuarios = await getUsuarios();
        const rolesOptions= await getRolesOptions();
        const apartamentoOptions= await getApartamentosOptions();
        res.render('Usuario', { Usuarios , rolesOptions,apartamentoOptions });
    } catch (error) {
        console.error('Error al mostrar Usuario:', error.message);
        res.status(500).json({ error: 'Error al mostrar Usuario' });
    }
};

async function getRolesOptions() {
    try {
        const query = "SELECT idRol, nombre FROM Roles";
        const result = await rest.executeQuery(query);
        return result.data;
    } catch (error) {
        throw error;
    }
  }

async function getApartamentosOptions() {
    try {
        const query = "SELECT idApartamento, numeroApto+' '+numeroTorre as Apto FROM Apartamentos";
        const result = await rest.executeQuery(query);
        return result.data;
    } catch (error) {
        throw error;
    }
  }

const createUsuario = async (usuario) => {
    try {
        const query = "INSERT INTO Usuarios (nombre,clave,idRol,idApartamento) VALUES (@nombre,@clave,@idRol,@idApartamento)";
        const result = await rest.executeQuery(query, [{name:'nombre', type: 'varchar', value:usuario.nombre},
        {name:'clave', type: 'varchar', value:usuario.clave},
        {name:'idRol', type: 'int', value:usuario.idRol},
        {name:'idApartamento', type: 'int', value:usuario.idApartamento}
        ]);
        return result;
    } catch (error) {
        throw error;
    }
};

async function getUsuarios() {
    try {
        const query = " select idUsuario,u.nombre , u.clave, r.nombre as nombreRol, a.numeroApto+'' + a.numeroTorre as nombreApartamento "+
                    "   from usuarios u "+
                    "  inner join roles r on u.idRol= r.idRol " +
                    " inner join Apartamentos a on u.idApartamento=a.idApartamento ";
        const result = await rest.executeQuery(query);
        return result.data;
    } catch (error) {
        console.error('Error al obtener los Usuarios:', error.message);
        throw error;
    }
} 

const updateUsuario = async (req, res) => {
  console.log(req)
  const idUsuario = req.params.id;
  const nombre = req.body.nombre;
  const clave= req.body.clave;
  const idRol = req.body.idRol;
  const idApartamento= req.body.idApartamento;
  try {
    console.log(req)
      const query = 'UPDATE Usuarios SET nombre=@nombre, clave= @clave, idRol=@idRol, idApartamento= @idApartamento WHERE idUsuario=@idUsuario';
      const result = await rest.executeQuery(query, [{name:'nombre', type: 'varchar', value:nombre},
        {name:'clave', type: 'varchar', value:clave},
        {name:'idRol', type: 'int', value:idRol},
        {name:'idApartamento', type: 'int', value:idApartamento},
        {name:'idUsuario', type: 'int', value:idUsuario},
      ]);
      
      res.json({ success: true, data: result });
  } catch (error) {
      res.status(500).json({ success: false, error: error.message });
  }
};

const deleteUsuario = async (id) => {
    try {
        const query = 'DELETE FROM Usuarios WHERE idUsuario=@idUsuario';
        const result = await rest.executeQuery(query, [{name:'idUsuario', type: 'int', value:id}]);
        return result;
    } catch (error) {
        throw error;
    }
};

module.exports = {
    mostrarUsuario,
    createUsuario,
    getUsuarios,
    updateUsuario,
    deleteUsuario,
};
