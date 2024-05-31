// config/dbConfig.js
const sql = require('mssql');

const config = {
  user: 'HV',
  password: '1234567',
  server: 'DESKTOP-MSCL34K',
  database: 'ReservaEscenarios',
  options: {
    encrypt: false, // Si estás usando Azure, necesitas esto
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