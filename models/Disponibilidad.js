// models/Disponibilidad.js
const { sql, poolPromise } = require('../config/dbConfig');

class Disponibilidad {
  constructor(idEscenario, hora,dia,mes) {
    this.idEscenario = idEscenario;
    this.hora = hora;
    this.dia= dia;   
    this.mes= mes;
  }

  async guardar() {
    try {
      const pool = await poolPromise;
      const result = await pool
        .request()
        .input('idEscenario', sql.Int, this.idEscenario)
        .input('hora', sql.VarChar, this.hora)
        .input('dia', sql.Bit, this.dia)
        .input('mes', sql.Bit, this.mes)
        .query('INSERT INTO Disponibilidades (idEscenario, hora,dia, mes) VALUES (@idEscenario, @hora, @dia,@mes)');
      return result.rowsAffected;
    } catch (error) {
      console.log('Error al guardar la disponibilidad en la base de datos', error);
      throw error;
    }
  }

  async actualizar() {
    try {
      const pool = await poolPromise;
      const result = await pool
        .request()
        .input('idEscenario', sql.Int, this.idEscenario)
        .input('hora', sql.VarChar, this.hora)
        .input('dia', sql.Bit, this.dia)
        .input('mes', sql.Bit, this.mes)
        .input('id', sql.Int, this.id)
        .query('UPDATE Disponibilidades SET idEscenario = @idEscenario, hora = @hora, dia= @dia, mes= @mes WHERE idDisponibilidad = @id');
      return result.rowsAffected;
    } catch (error) {
      console.log('Error al actualizar la disponibilidad en la base de datos', error);
      throw error;
    }
  }

  async eliminar() {
    try {
      const pool = await poolPromise;
      const result = await pool
        .request()
        .input('id', sql.Int, this.id)
        .query('DELETE FROM Disponibilidades WHERE idDisponibilidad = @id');
      return result.rowsAffected;
    } catch (error) {
      console.log('Error al eliminar la disponibilidad de la base de datos', error);
      throw error;
    }
  }

  static async obtenerTodos() {
    try {
      const pool = await poolPromise;
      const result = await pool.request().query(" SELECT idDisponibilidad, b.nombre, mes, dia, substring(convert(varchar, hora), 1, 5) as hora "+
            " FROM disponibilidades a  "+
            " INNER JOIN escenariosDeportivos b ON a.idEscenario = b.idEscenario "+
            " ORDER BY nombre, mes, dia, hora ASC");
      return result.recordset;
    } catch (error) {
      console.log('Error al obtener disponibilidades desde la base de datos', error);
      throw error;
    }
  }

  static async obtenerPorId(id) {
    try {
      const pool = await poolPromise;
      const result = await pool
        .request()
        .input('id', sql.Int, id)
        .query(" SELECT idDisponibilidad, b.nombre, mes, dia, substring(convert(varchar, hora), 1, 5) as hora "+
            " FROM disponibilidades a  "+
            " INNER JOIN escenariosDeportivos b ON a.idEscenario = b.idEscenario "+
            " WHERE idDisponibilidad = @id "+
            " ORDER BY nombre, mes, dia, hora ASC");
      return result.recordset[0];
    } catch (error) {
      console.log('Error al obtener disponibilidad por ID desde la base de datos', error);
      throw error;
    }
  }
}

module.exports = Disponibilidad;
