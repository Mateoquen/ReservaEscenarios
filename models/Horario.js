// models/Horario.js
const {sql, poolPromise}= require('../config/dbConfig');

class Horario {
    constructor (nombre, horaInicial, horaFinal){
        this.nombre= nombre;
        this.horaInicial= horaInicial;
        this.horaFinal= horaFinal;
    }

    async guardar(){
        try{

            const pool = await poolPromise;
            const result= await pool
            .request()
            .input('nombre',sql.VarChar, this.nombre)
            .input('horaInicial',sql.VarChar, this.horaInicial)
            .input('horaFinal',sql.VarChar, this.horaFinal)
            .query(' insert into HORARIOS (nombre, horainicial,horafinal) values (@nombre, @horaInicial , @horaFinal) ')

            return result.rowsAffected;

        }catch(error){
            console.log('Error al guardar el Horario en la base de datos',error);
            throw error;
        }
    }

    async actualizar(){
        try{
            const pool = await poolPromise;
            const result= await pool
            .request()
            .input('nombre',sql.VarChar, this.nombre)
            .input('horaInicial',sql.VarChar, this.horaInicial)
            .input('horaFinal',sql.VarChar, this.horaFinal)
            .input('id',sql.Int, this.id)
            .query(' update HORARIOS set nombre=@nombre , horainicial =@horaInicial ,horafinal =@horaFinal where idHorario= @id ')

            return result.rowsAffected;

        }catch(error){
            console.log('Error al actulizar el Horario en la base de datos',error);
            throw error;
        } 
    }

    async eliminar(){
        try{
            const pool = await poolPromise;
            const result= await pool
            .request()
            .input('id',sql.Int, this.id)
            .query(' delete from  HORARIOS where idHorario= @id ')
            return result.rowsAffected;
        }catch(error){
            console.log('Error al eliminar el Horario en la base de datos',error);
            throw error;
        } 
    }

    static async obtenerTodos(){
        try{
            const pool = await poolPromise;
            const result= await pool.request().query("select idHorario, nombre, "+
                    " convert(varchar(5),horainicial) as horainicial, "+
                    " convert(varchar(5),horafinal) as horafinal "+
                    " from horarios ");         
            return result.recordset;
        }catch(error){
            console.log('Error al obtener el Horario en la base de datos',error);
            throw error;
        } 
    }

    
  static async obtenerPorId(id) {
    try {
      const pool = await poolPromise;
      const result = await pool
        .request()
        .input('id', sql.Int, id)
        .query("select idHorario, nombre, "+
                    " convert(varchar(5),horainicial) as horainicial, "+
                    " convert(varchar(5),horafinal) as horafinal "+ 
                    " from horarios  idHorario = @id");
      return result.recordset[0];
    } catch (error) {
      console.log('Error al obtener horario por ID desde la base de datos', error);
      throw error;
    }
  }
}
module.exports= Horario;