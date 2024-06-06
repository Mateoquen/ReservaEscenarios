const { sql, poolPromise } = require('../config/dbConfig');
const logger = require('../config/logger');
const bcrypt = require('bcrypt');

class Usuario {
  constructor(idTipoId,identificacion,nombre, clave, idRol, idApartamento) {
    this.idTipoId= idTipoId;
    this.identificacion= identificacion;
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
        .input('idTipoId', sql.Int, this.idTipoId)
        .input('identificacion', sql.Int, this.identificacion)
        .query('INSERT INTO usuarios (nombre, clave, idRol, idApartamento,idTipoId,identificacion) VALUES (@nombre, @clave, @idRol, @idApartamento,@idTipoId, @identificacion)');
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
        .input('idTipoId', sql.Int, this.idTipoId)
        .input('identificacion', sql.Int, this.identificacion)
        .input('id', sql.Int, this.id)
        .query('UPDATE usuarios SET nombre = @nombre, clave = @clave, idRol = @idRol, idApartamento = @idApartamento, idTipoId=@idTipoId, identificacion = @identificacion WHERE idUsuario = @id');
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
      const result = await pool.request().query(`
      SELECT idUsuario, 
      ti.codigoTipoId+' '+ ti.nombreTipoId as nombreTipoId ,
      u.identificacion,
      u.nombre, 
      u.clave, 
        isnull(r.nombre,'SIN ROL') AS nombreRol, 
        isnull(a.numeroApto,'SIN') + '' + isnull(a.numeroTorre,'APTO') AS nombreApartamento
        FROM usuarios u
        left JOIN roles r ON u.idRol = r.idRol
        left JOIN Apartamentos a ON u.idApartamento = a.idApartamento
      inner join tipoIdentificacion ti on u.idTipoId=ti.idTipoId
      `);
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
        .query(`
        SELECT idUsuario, 
        ti.codigoTipoId+' '+ ti.nombreTipoId as nombreTipoId ,
        u.identificacion,
        u.nombre, 
        u.clave, 
          isnull(r.nombre,'SIN ROL') AS nombreRol, 
          isnull(a.numeroApto,'SIN') + '' + isnull(a.numeroTorre,'APTO') AS nombreApartamento
          FROM usuarios u
          left JOIN roles r ON u.idRol = r.idRol
          left JOIN Apartamentos a ON u.idApartamento = a.idApartamento
          inner join tipoIdentificacion ti on u.idTipoId=ti.idTipoId
          WHERE u.idUsuario = @id
        `);
      return result.recordset[0];
    } catch (error) {
      logger.error('Error al obtener usuario por ID desde la base de datos', error);
      throw error;
    }
  }

  static async obtenerPorNombre(nombre) {
    try {
      const pool = await poolPromise;
      const result = await pool.request()
        .input('nombre',sql.VarChar, nombre)
        .query('SELECT * FROM usuarios WHERE nombre = @nombre');
      return result.recordset[0];
    } catch (error) {
      logger.error('Error al obtener usuario por nombre desde la base de datos', error);
      throw error;
    }
  }
}

module.exports = Usuario;
