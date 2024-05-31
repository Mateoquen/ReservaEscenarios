const { sql, poolPromise } = require('../config/dbConfig');
const logger = require('../config/logger'); 

class Usuario {
  constructor(nombre, clave, idRol, idApartamento) {
    this.nombre = nombre;
    this.clave = clave;
    this.idRol = idRol;
    this.idApartamento = idApartamento;
  }

  async guardar() {
    try {
      const pool = await poolPromise;
      const result = await pool.request()
        .input('nombre', sql.VarChar, this.nombre)
        .input('clave', sql.VarChar, this.clave)
        .input('idRol', sql.Int, this.idRol)
        .input('idApartamento', sql.Int, this.idApartamento)
        .query('INSERT INTO usuarios (nombre, clave, idRol, idApartamento) VALUES (@nombre, @clave, @idRol, @idApartamento)');
      return result.rowsAffected;
    } catch (error) {
      logger.error('Error al guardar el usuario en la base de datos', error);
      throw error;
    }
  }

  async actualizar() {
    try {
      const pool = await poolPromise;
      const result = await pool.request()
        .input('nombre', sql.VarChar, this.nombre)
        .input('clave', sql.VarChar, this.clave)
        .input('idRol', sql.Int, this.idRol)
        .input('idApartamento', sql.Int, this.idApartamento)
        .input('id', sql.Int, this.id)
        .query('UPDATE usuarios SET nombre = @nombre, clave = @clave, idRol = @idRol, idApartamento = @idApartamento WHERE idUsuario = @id');
      return result.rowsAffected;
    } catch (error) {
      logger.error('Error al actualizar el usuario en la base de datos', error);
      throw error;
    }
  }

  async eliminar() {
    try {
      const pool = await poolPromise;
      const result = await pool.request()
        .input('id', sql.Int, this.id)
        .query('DELETE FROM usuarios WHERE idUsuario = @id');
      return result.rowsAffected;
    } catch (error) {
      logger.error('Error al eliminar el usuario de la base de datos', error);
      throw error;
    }
  }

  static async obtenerTodos() {
    try {
      const pool = await poolPromise;
      const result = await pool.request().query(" select idUsuario,u.nombre , u.clave, r.nombre as nombreRol, a.numeroApto+'' + a.numeroTorre as nombreApartamento "+
      "   from usuarios u "+
      "  inner join roles r on u.idRol= r.idRol " +
      " inner join Apartamentos a on u.idApartamento=a.idApartamento ");
      return result.recordset;
    } catch (error) {
      logger.error('Error al obtener usuarios desde la base de datos', error);
      throw error;
    }
  }

  static async obtenerPorId(id) {
    try {
      const pool = await poolPromise;
      const result = await pool.request()
        .input('id', sql.Int, id)
        .query(" select idUsuario,u.nombre , u.clave, r.nombre as nombreRol, a.numeroApto+'' + a.numeroTorre as nombreApartamento "+
        "   from usuarios u "+
        "  inner join roles r on u.idRol= r.idRol " +
        " inner join Apartamentos a on u.idApartamento=a.idApartamento  WHERE u.idUsuario = @id");
      return result.recordset[0];
    } catch (error) {
      logger.error('Error al obtener usuario por ID desde la base de datos', error);
      throw error;
    }
  }
}

module.exports = Usuario;
