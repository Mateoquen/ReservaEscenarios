const {sql, poolPromise}= require('../config/dbConfig');

class EscenarioDeportivo {
    constructor(nombre,idHorario) {
        this.nombre = nombre;
        this.idHorario = idHorario;
    }
    async guardar() {
        try {
            const pool = await poolPromise;
            const result = await pool.request()
                .input('nombre', sql.VarChar, this.nombre)
                .input('idHorario', sql.Int, this.idHorario)
                .query('INSERT INTO EscenariosDeportivos (nombre,idHorario) VALUES (@nombre, @idHorario)');
            
            const result2 = await pool.request()
                .input('nombre', sql.VarChar, this.nombre)
                .query('exec sp_insertarDisponibilidades @nombre');

            return result.rowsAffected;
        } catch (error) {
            logger.error('Error al guardar el escenario deportivo en la base de datos', error);
            throw error;
        }
    }
    async actualizar() {
        try {
            const pool = await poolPromise;
            const result = await pool.request()
                .input('nombre', sql.VarChar, this.nombre)
                .input('id', sql.Int, this.id)
                .input('idHorario', sql.Int, this.idHorario)
                .query('UPDATE EscenariosDeportivos SET nombre = @nombre,idHorario =@idHorario WHERE idEscenario = @id');

            const resultReserv = await pool
                .request()
                .input('id', sql.Int, this.id)
                .query('DELETE FROM reservas WHERE idEscenario = @id');    

            const resultDispo = await pool
                .request()
                .input('id', sql.Int, this.id)
                .query('DELETE FROM disponibilidades WHERE idEscenario = @id');

            const result2 = await pool.request()
                .input('nombre', sql.VarChar, this.nombre)
                .query('exec sp_insertarDisponibilidades @nombre');

            return result.rowsAffected;
        } catch (error) {
            console.log('Error al actualizar el escenario deportivo en la base de datos', error);
            throw error;
        }
    }
    async eliminar() {
        try {
            const pool = await poolPromise;

            const resultReserv = await pool
                .request()
                .input('id', sql.Int, this.id)
                .query('DELETE FROM reservas WHERE idEscenario = @id');   
                 
            const resultDispo = await pool
                .request()
                .input('id', sql.Int, this.id)
                .query('DELETE FROM disponibilidades WHERE idEscenario = @id');

            const result = await pool
                .request()
                .input('id', sql.Int, this.id)
                .query('DELETE FROM EscenariosDeportivos WHERE idEscenario = @id');

            return result.rowsAffected;
        } catch (error) {
            console.log('Error al eliminar el escenario deportivo de la base de datos', error);
            throw error;
        }
    }
    static async obtenerTodos() {
        try {
            const pool = await poolPromise;
            const result = await pool.request().query('select idEscenario,a.nombre as nombreEscenario, b.nombre as nombreHorario' +
            ' from escenariosDeportivos a' +
            ' inner join horarios b on a.idHorario=b.idHorario');
            return result.recordset;
        } catch (error) {
            console.log('Error al obtener los escenarios deportivos desde la base de datos', error);
            throw error;
        }
    }
    
}
module.exports = EscenarioDeportivo;