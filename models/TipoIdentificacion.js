const { sql, poolPromise } = require('../config/dbConfig');
const logger = require('../config/logger');
const bcrypt = require('bcrypt');

class TipoIdentificacion {
  constructor(codigoTipoId,nombreTipoId) {
    this.codigoTipoId = codigoTipoId;
    this.nombreTipoId = nombreTipoId;
  }

  async guardar() {
    try {
      const pool = await poolPromise;
      const result = await pool.request()
        .input('codigoTipoId', sql.VarChar, this.codigoTipoId)
        .input('nombreTipoId', sql.VarChar, this.nombreTipoId)
        .query('INSERT INTO tipoIdentificacion (codigoTipoId, nombreTipoId) VALUES (@codigoTipoId, @nombreTipoId)');
      return result.rowsAffected;
    } catch (error) {
      logger.error('Error al guardar el tipo de identificacion en la base de datos', error);
      throw error;
    }
  }

  async actualizar() {
    try {
      const pool = await poolPromise;
      const result = await pool.request()
        .input('codigoTipoId', sql.VarChar, this.codigoTipoId)
        .input('nombreTipoId', sql.VarChar, this.nombreTipoId)
        .input('id', sql.Int, this.id)
        .query('UPDATE tipoidentificacion SET codigoTipoId = @codigoTipoId, nombreTipoId = @nombreTipoId WHERE idTipoId = @id');
      return result.rowsAffected;
    } catch (error) {
      logger.error('Error al guardar el tipo de identificacion en la base de datos', error);
      throw error;
    }
  }

  async eliminar() {
    try {
      const pool = await poolPromise;
      const result = await pool.request()
        .input('id', sql.Int, this.id)
        .query('DELETE FROM tipoidentificacion WHERE idTipoId = @id');
      return result.rowsAffected;
    } catch (error) {
      logger.error('Error al eliminar el tipo de identificacion de la base de datos', error);
      throw error;
    }
  }

  static async obtenerTodos() {
    try {
      const pool = await poolPromise;
      const result = await pool.request().query(`
      SELECT idTipoId,codigoTipoId+' '+ nombreTipoId as nombreTipoId from tipoidentificacion
      `);
      return result.recordset;
    } catch (error) {
      logger.error('Error al obtener tipo de identificacion desde la base de datos', error);
      throw error;
    }
  }

  static async obtenerPorId(id) {
    try {
      const pool = await poolPromise;
      const result = await pool.request()
        .input('id', sql.Int, id)
        .query(`
            SELECT idTipoId,codigoTipoId+' '+ nombreTipoId as nombreTipoId from tipoidentificacion
          WHERE idTipoId = @id
        `);
      return result.recordset[0];
    } catch (error) {
      logger.error('Error al obtener usuario por ID desde la base de datos', error);
      throw error;
    }
  }
}

module.exports = TipoIdentificacion;
