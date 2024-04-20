const config = {
  user: 'HV',
  password: '1234567',
  server: 'DESKTOP-MSCL34K',  // replace this with your IP Serve or HOST
  database: 'ReservaEscenarios',
  options: {
    enableArithAbort: false, // Cambia a true si es necesario
  },
}; 

module.exports = new (require('rest-mssql-nodejs'))({
  user: config.user,
  password: config.password,
  server: config.server,
  database: config.database
})
