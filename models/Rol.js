// models/Usuario.js
const { sql, poolPromise } = require('../config/dbConfig');

class Rol {
  constructor(nombre, administrador) {
    this.nombre = nombre;
    this.administrador = administrador;
  }

  async guardar() {
    try {
      const pool = await poolPromise;
      const result = await pool
        .request()
        .input('nombre', sql.VarChar, this.nombre)
        .input('administrador', sql.Bit, this.administrador)
        .query('INSERT INTO roles (nombre, administrador) VALUES (@nombre, @administrador)');
      return result.rowsAffected;
    } catch (error) {
      console.log('Error al guardar el rol en la base de datos', error);
      throw error;
    }
  }

  async actualizar() {
    try {
      const pool = await poolPromise;
      const result = await pool
        .request()
        .input('nombre', sql.VarChar, this.nombre)
        .input('administrador', sql.Bit, this.administrador)
        .input('id', sql.Int, this.id)
        .query('UPDATE roles SET nombre = @nombre, administrador = @administrador WHERE idRol = @id');
      return result.rowsAffected;
    } catch (error) {
      console.log('Error al actualizar el rol en la base de datos', error);
      throw error;
    }
  }

  async eliminar() {
    try {
      const pool = await poolPromise;
      const result = await pool
        .request()
        .input('id', sql.Int, this.id)
        .query('DELETE FROM roles WHERE idRol = @id');
      return result.rowsAffected;
    } catch (error) {
      console.log('Error al eliminar el rol de la base de datos', error);
      throw error;
    }
  }

  static async obtenerTodos() {
    try {
      const pool = await poolPromise;
      const result = await pool.request().query('SELECT * FROM roles');
      return result.recordset;
    } catch (error) {
      console.log('Error al obtener roles desde la base de datos', error);
      throw error;
    }
  }

  static async obtenerPorId(id) {
    try {
      const pool = await poolPromise;
      const result = await pool
        .request()
        .input('id', sql.Int, id)
        .query('SELECT * FROM roles WHERE idRol = @id');
      return result.recordset[0];
    } catch (error) {
      console.log('Error al obtener rol por ID desde la base de datos', error);
      throw error;
    }
  }
}

module.exports = Rol;
