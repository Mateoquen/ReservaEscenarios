const express = require('express');
const path = require('path');
const rest = require('../public/config');


const mostrarApto = async (req, res) => {
    try {
        const Apartamentos = await getApto();
        res.render('Apartamentos', {Apartamentos});
    } catch (error) {
        console.error('Error al mostrar Apartamento:', error.message);
        res.status(500).json({ error: 'Error al mostrar Apartamento' });
    }
};

const createApto = async (apartamento) => {
    try {
   
        console.log(apartamento.estado)
        const query = "INSERT INTO Apartamentos (numeroApto,numeroTorre,estado) VALUES (@numeroApto,@numeroTorre,@estado)";
        const result = await rest.executeQuery(query, [{name:'numeroApto', type: 'varchar', value:apartamento.numeroApto},
        {name:'numeroTorre', type: 'varchar', value:apartamento.numeroTorre},
        {name:'estado', type: 'smallint', value:apartamento.estado}
        ]);
        return result;
    } catch (error) {
        throw error;
    }
};

async function getApto() {
    try {
        const query = "select idApartamento,numeroApto,numeroTorre, case estado when 1 then 'ACTIVO' else 'BLOQUEADO' end as estado from apartamentos";
        const result = await rest.executeQuery(query);
        return result.data;
    } catch (error) {
        console.error('Error al obtener los Apartamentos:', error.message);
        throw error;
    }
} 

const updateApto = async (req, res) => {
  console.log(req)
  const idApartamento = req.params.id;
  const numeroApto = req.body.numeroApto;
  const numeroTorre = req.body.numeroTorre;
  const estado = req.body.estado;
  try {
    console.log(req)
      const query = 'UPDATE Apartamentos SET numeroApto=@numeroApto, numeroTorre=@numeroTorre, estado=@estado WHERE idApartamento=@idApartamento';
      const result = await rest.executeQuery(query, [{name:'numeroApto', type: 'varchar', value:numeroApto},
        {name:'numeroTorre', type: 'varchar', value:numeroTorre},
        {name:'estado', type: 'bit', value:estado},
        {name:'idApartamento', type: 'int', value:idApartamento},
      ]);
      
      res.json({ success: true, data: result });
  } catch (error) {
      res.status(500).json({ success: false, error: error.message });
  }
};

const deleteApto = async (id) => {
    try {
        const query = 'DELETE FROM Apartamentos WHERE idApartamento=@idApartamento';
        const result = await rest.executeQuery(query, [{name:'idApartamento', type: 'int', value:id}]);
        return result;
    } catch (error) {
        throw error;
    }
};

module.exports = {
    mostrarApto,
    createApto,
    getApto,
    updateApto,
    deleteApto,
};
