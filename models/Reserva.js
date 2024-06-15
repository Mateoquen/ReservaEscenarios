const { sql, poolPromise } = require('../config/dbConfig');

class Reserva {
  constructor(idUsuario, idEscenario, idDisponibilidad) {
    this.idUsuario = idUsuario;
    this.idEscenario = idEscenario;
    this.idDisponibilidad = idDisponibilidad;
  }

  // Método para guardar una nueva reserva en la base de datos
  async guardar() {
    try {
      const pool = await poolPromise;
      const result = await pool.request()
        .input('idUsuario', sql.Int, this.idUsuario)
        .input('idEscenario', sql.Int, this.idEscenario)
        .input('idDisponibilidad', sql.Int, this.idDisponibilidad)
        .query('INSERT INTO reservas (idUsuario, idEscenario, idDisponibilidad) VALUES (@idUsuario, @idEscenario, @idDisponibilidad)');
      return result.rowsAffected;
    } catch (error) {
      console.error('Error al guardar la reserva en la base de datos:', error);
      throw new Error('Error al guardar la reserva en la base de datos');
    }
  }

  // Método para actualizar una reserva existente en la base de datos
  async actualizar() {
    try {
      const pool = await poolPromise;
      const result = await pool.request()
        .input('idUsuario', sql.Int, this.idUsuario)
        .input('idEscenario', sql.Int, this.idEscenario)
        .input('idDisponibilidad', sql.Int, this.idDisponibilidad)
        .input('id', sql.Int, this.id)
        .query(`
          UPDATE reservas 
          SET idUsuario = @idUsuario, idEscenario = @idEscenario, idDisponibilidad = @idDisponibilidad 
          WHERE idReserva = @id
        `);
      return result.rowsAffected;
    } catch (error) {
      console.error('Error al actualizar la reserva en la base de datos:', error);
      throw new Error('Error al actualizar la reserva en la base de datos');
    }
  }

  // Método para eliminar una reserva de la base de datos
  async eliminar() {
    try {
      const pool = await poolPromise;
      const result = await pool.request()
        .input('id', sql.Int, this.id)
        .query('DELETE FROM reservas WHERE idReserva = @id');
      return result.rowsAffected;
    } catch (error) {
      console.error('Error al eliminar la reserva de la base de datos:', error);
      throw new Error('Error al eliminar la reserva de la base de datos');
    }
  }

  // Método estático para obtener todas las reservas
  static async obtenerTodos() {
    try {
      const pool = await poolPromise;
      const result = await pool.request().query(`
        SELECT idReserva, b.nombre AS nombreUsuario, c.nombre AS nombreEscenario, 
          SUBSTRING(CONVERT(VARCHAR, d.año) + '-' +
            RIGHT('0' + CONVERT(VARCHAR, d.mes), 2) + '-' +
            RIGHT('0' + CONVERT(VARCHAR, d.dia), 2) + ' ' +
            CONVERT(VARCHAR, d.hora), 1, 19) AS fechaReserva
        FROM reservas a 
        INNER JOIN usuarios b ON a.idUsuario = b.idUsuario 
        INNER JOIN escenariosDeportivos c ON a.idEscenario = c.idEscenario 
        INNER JOIN disponibilidades d ON a.idDisponibilidad = d.idDisponibilidad
      `);
      return result.recordset;
    } catch (error) {
      console.error('Error al obtener reservas desde la base de datos:', error);
      throw new Error('Error al obtener reservas desde la base de datos');
    }
  }

  // Método estático para obtener una reserva por ID
  static async obtenerPorId(id) {
    try {
      const pool = await poolPromise;
      const result = await pool.request()
        .input('id', sql.Int, id)
        .query(`
          SELECT idReserva, b.nombre AS nombreUsuario, c.nombre AS nombreEscenario, 
            SUBSTRING(CONVERT(VARCHAR, d.año) + '-' +
              RIGHT('0' + CONVERT(VARCHAR, d.mes), 2) + '-' +
              RIGHT('0' + CONVERT(VARCHAR, d.dia), 2) + ' ' +
              CONVERT(VARCHAR, d.hora), 1, 19) AS fechaReserva
          FROM reservas a 
          INNER JOIN usuarios b ON a.idUsuario = b.idUsuario 
          INNER JOIN escenariosDeportivos c ON a.idEscenario = c.idEscenario 
          INNER JOIN disponibilidades d ON a.idDisponibilidad = d.idDisponibilidad
          WHERE idReserva = @id
        `);
      return result.recordset[0];
    } catch (error) {
      console.error('Error al obtener reserva por ID desde la base de datos:', error);
      throw new Error('Error al obtener reserva por ID desde la base de datos');
    }
  }
}

module.exports = Reserva;
