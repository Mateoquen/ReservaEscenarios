const express = require('express');
const path = require('path');
const rest = require('../public/config');


const mostrarReserva = async (req, res) => {
    try {
        const Reservas = await getReservas();
        const Disponibilidades= await getDisponibilidades();
        res.render('Reserva', { Reservas,Disponibilidades });
    } catch (error) {
        console.error('Error al mostrar Reserva:', error.message);
        res.status(500).json({ error: 'Error al mostrar Reserva' });
    }
};

const createReserva = async (usuario) => {
    try {
        const query = "INSERT INTO Reservas (nombre,clave,idRol,idApartamento) VALUES (@nombre,@clave,@idRol,@idApartamento)";
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

async function getDisponibilidades() {
    try {
        const query = " select idDisponibilidad,b.nombre,mes,dia,substring(convert(varchar,hora),1,5) as hora  from disponibilidades a "+
                        " inner join escenariosDeportivos b on a.idEscenario=b.idEscenario  "+
                        " order by nombre,mes,dia,hora asc";
        const result = await rest.executeQuery(query);
        return result.data;
    } catch (error) {
        console.error('Error al obtener las disponibilidades :', error.message);
        throw error;
    }
} 

async function getReservas() {
    try {
        const query = " select idReserva,b.nombre as nombreUsuario,c.nombre as nombreEscenario,fechaInicio,fechafinal from reservas a "+
                    " inner join usuarios b on a.idUsuario= b.idUsuario "+
                    " inner join escenariosDeportivos c on a.idEscenario= c.idEscenario ";
        const result = await rest.executeQuery(query);
        return result.data;
    } catch (error) {
        console.error('Error al obtener las Reservas:', error.message);
        throw error;
    }
} 

const updateReserva = async (req, res) => {
  console.log(req)
  const idReserva = req.params.id;
  const nombre = req.body.nombre;
  const clave= req.body.clave;
  const idRol = req.body.idRol;
  const idApartamento= req.body.idApartamento;
  try {
    console.log(req)
      const query = 'UPDATE Reservas SET nombre=@nombre, clave= @clave, idRol=@idRol, idApartamento= @idApartamento WHERE idReserva=@idReserva';
      const result = await rest.executeQuery(query, [{name:'nombre', type: 'varchar', value:nombre},
        {name:'clave', type: 'varchar', value:clave},
        {name:'idRol', type: 'int', value:idRol},
        {name:'idApartamento', type: 'int', value:idApartamento},
        {name:'idReserva', type: 'int', value:idReserva},
      ]);
      
      res.json({ success: true, data: result });
  } catch (error) {
      res.status(500).json({ success: false, error: error.message });
  }
};

const deleteReserva = async (id) => {
    try {
        const query = 'DELETE FROM Reservas WHERE idReserva=@idReserva';
        const result = await rest.executeQuery(query, [{name:'idReserva', type: 'int', value:id}]);
        return result;
    } catch (error) {
        throw error;
    }
};

module.exports = {
    mostrarReserva,
    createReserva,
    getReservas,
    updateReserva,
    deleteReserva,
};
