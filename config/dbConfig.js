// config/dbConfig.js
const sql = require('mssql');

const config = {
  user: 'reservaadmin',
  password: 'Reserva.2024',
  server: 'reservaescenarios.database.windows.net',
  database: 'ReservaEscenarios',
  options: {
    encrypt: true, // Si estás usando Azure, necesitas esto
    enableArithAbort: true // Para evitar errores relacionados con aritmética
  }
};

const poolPromise = new sql.ConnectionPool(config)
  .connect()
  .then(pool => {
    console.log('Conexión a SQL Server exitosa');
    return pool;
  })
  .catch(err => console.log('Error en la conexión a SQL Server', err));

module.exports = {
  sql,
  poolPromise
};
