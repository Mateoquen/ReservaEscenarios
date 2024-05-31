// models/Usuario.js
const { sql, poolPromise } = require('../config/dbConfig');

class Apartamento {
  constructor(numeroApto, numeroTorre,estado) {
    this.numeroApto = numeroApto;
    this.numeroTorre = numeroTorre;
    this.estado= estado;
   
  }

  async guardar() {
    try {
      const pool = await poolPromise;
      const result = await pool
        .request()
        .input('numeroApto', sql.VarChar, this.numeroApto)
        .input('numeroTorre', sql.VarChar, this.numeroTorre)
        .input('estado', sql.Bit, this.estado)
        .query('INSERT INTO Apartamentos (numeroApto, numeroTorre,estado) VALUES (@numeroApto, @numeroTorre, @estado)');
      return result.rowsAffected;
    } catch (error) {
      console.log('Error al guardar el apartamento en la base de datos', error);
      throw error;
    }
  }

  async actualizar() {
    try {
      const pool = await poolPromise;
      const result = await pool
        .request()
        .input('numeroApto', sql.VarChar, this.numeroApto)
        .input('numeroTorre', sql.VarChar, this.numeroTorre)
        .input('estado', sql.Bit, this.estado)
        .input('id', sql.Int, this.id)
        .query('UPDATE Apartamentos SET numeroApto = @numeroApto, numeroTorre = @numeroTorre, estado= @estado WHERE idApartamento = @id');
      return result.rowsAffected;
    } catch (error) {
      console.log('Error al actualizar el apartamento en la base de datos', error);
      throw error;
    }
  }

  async eliminar() {
    try {
      const pool = await poolPromise;
      const result = await pool
        .request()
        .input('id', sql.Int, this.id)
        .query('DELETE FROM Apartamentos WHERE idApartamento = @id');
      return result.rowsAffected;
    } catch (error) {
      console.log('Error al eliminar el Apartamento de la base de datos', error);
      throw error;
    }
  }

  static async obtenerTodos() {
    try {
      const pool = await poolPromise;
      const result = await pool.request().query("SELECT  idApartamento, numeroApto+' '+numeroTorre as Apto  FROM apartamentos");
      return result.recordset;
    } catch (error) {
      console.log('Error al obtener Apartamentos desde la base de datos', error);
      throw error;
    }
  }

  static async obtenerPorId(id) {
    try {
      const pool = await poolPromise;
      const result = await pool
        .request()
        .input('id', sql.Int, id)
        .query('SELECT * FROM Apartamentos WHERE idApartamento = @id');
      return result.recordset[0];
    } catch (error) {
      console.log('Error al obtener Apartamento por ID desde la base de datos', error);
      throw error;
    }
  }
}

module.exports = Apartamento;
