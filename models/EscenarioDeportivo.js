const {sql, poolPromise} = require('../database');

class EscenarioDeportivo {
    constructor(nombre,estado) {
        this.nombre = nombre;
    }
    async guardar() {
        try {
            const pool = await poolPromise;
            const result = await pool
                .request()
                .input('nombre', sql.VarChar, this.nombre)
                .query('INSERT INTO EscenariosDeportivos (nombre) VALUES (@nombre)');
            return result.rowsAffected;
        } catch (error) {
            console.log('Error al guardar el escenario deportivo en la base de datos', error);
            throw error;
        }
    }
    async actualizar() {
        try {
            const pool = await poolPromise;
            const result = await pool
                .request()
                .input('nombre', sql.VarChar, this.nombre)
                .input('id', sql.Int, this.id)
                .query('UPDATE EscenariosDeportivos SET nombre = @nombre WHERE idEscenarioDeportivo = @id');
            return result.rowsAffected;
        } catch (error) {
            console.log('Error al actualizar el escenario deportivo en la base de datos', error);
            throw error;
        }
    }
    async eliminar() {
        try {
            const pool = await poolPromise;
            const result = await pool
                .request()
                .input('id', sql.Int, this.id)
                .query('DELETE FROM EscenariosDeportivos WHERE idEscenarioDeportivo = @id');
            return result.rowsAffected;
        } catch (error) {
            console.log('Error al eliminar el escenario deportivo de la base de datos', error);
            throw error;
        }
    }
    async obtenerTodos() {
        try {
            const pool = await poolPromise;
            const result = await pool.request().query('SELECT * FROM EscenariosDeportivos');
            return result.recordset;
        } catch (error) {
            console.log('Error al obtener los escenarios deportivos desde la base de datos', error);
            throw error;
        }
    }
    async obtenerPorId(id) {
        try {
            const pool = await poolPromise;
            const result = await pool
                .request()
                .input('id', sql.Int, id)
                .query('SELECT * FROM EscenariosDeportivos WHERE idEscenarioDeportivo = @id');
            return result.recordset[0];
        } catch (error) {
            console.log('Error al obtener el escenario deportivo desde la base de datos', error);
            throw error;
        }
    }
}
module.exports = EscenarioDeportivo;