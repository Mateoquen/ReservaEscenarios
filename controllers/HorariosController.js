const Horario = require('../models/Horario');
const path= require('path');

class horariosController{
    static async mostrarTodos (req,res){
        try{
            const horarios = await Horario.obtenerTodos();
            res.render(path.join(__dirname,'..','views','horarios'),{horarios});
        }catch(error){
            res.status(500).send('Error al obtener horarios desde la base de datos');
        }
    }

    static async agregarHorario (req,res){
        try{
            const {nombre, horaInicial, horaFinal}= req.body;
            const nuevoHorario = new Horario(nombre, horaInicial, horaFinal);
            await nuevoHorario.guardar();
            res.redirect('/horarios');
        }catch(error){
            res.status(500).send('Error al agregar horarios desde la base de datos');
        }
    }

    static async actualizarHorario (req,res){
        try{
            const {nombre, horaInicial, horaFinal}= req.body;
            const horario = new Horario(nombre, horaInicial, horaFinal);
            horario.id = req.params.id;
            await horario.actualizar()
            res.redirect('/horarios');
        }catch(error){
            res.status(500).send('Error al actualizar horarios desde la base de datos');
        }
    }

    static async eliminarHorario (req,res){
        try{
            const horario = new Horario();
            horario.id = req.params.id;
            await horario.eliminar()
            res.redirect('/horarios');
        }catch(error){
            res.status(500).send('Error al eliminar horarios desde la base de datos');
        }
    }
}
module.exports= horariosController;