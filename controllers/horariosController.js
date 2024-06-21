const Horario = require('../models/Horario');
const path = require('path');

class horariosController {
    static async mostrarTodos(req, res) {
        try {
            const isAdmin = req.isAuthenticated() && req.user.isAdmin;
            if (isAdmin == true) {
                const horarios = await Horario.obtenerTodos();
                res.render(path.join(__dirname, '..', 'views', 'horarios'), { horarios, isAdmin });
            } else {
                res.render("index", { isAdmin });
            }
        } catch (error) {
            res.status(500).send('Error al obtener horarios desde la base de datos');
        }
    }

    static async agregarHorario(req, res) {
        try {
            const isAdmin = req.isAuthenticated() && req.user.isAdmin;
            if (isAdmin == true) {
                const { nombre, horaInicial, horaFinal } = req.body;
                const nuevoHorario = new Horario(nombre, horaInicial, horaFinal);
                await nuevoHorario.guardar();
                res.redirect('/horarios');
            } else {
                res.render("index", { isAdmin });
            }
        } catch (error) {
            res.status(500).send('Error al agregar horarios desde la base de datos');
        }
    }

    static async actualizarHorario(req, res) {
        try {
            const isAdmin = req.isAuthenticated() && req.user.isAdmin;
            if (isAdmin == true) {
                const { nombre, horaInicial, horaFinal } = req.body;
                const horario = new Horario(nombre, horaInicial, horaFinal);
                horario.id = req.params.id;
                await horario.actualizar()
                res.redirect('/horarios');
            } else {
                res.render("index", { isAdmin });
            }
        } catch (error) {
            res.status(500).send('Error al actualizar horarios desde la base de datos');
        }
    }

    static async eliminarHorario(req, res) {
        try {
            const isAdmin = req.isAuthenticated() && req.user.isAdmin;
            if (isAdmin == true) {
                const horario = new Horario();
                horario.id = req.params.id;
                await horario.eliminar()
                res.redirect('/horarios');
            } else {
                res.render("index", { isAdmin });
            }
        } catch (error) {
            res.status(500).send('Error al eliminar horarios desde la base de datos');
        }
    }
    static async generarInformeHorarios(req, res) {
        try {

            const informeHorarios = await Horario.obtenerTodos();
            const PDFDocument = require('pdfkit');
            const doc = new PDFDocument();
            doc.pipe(res);

            doc.fontSize(12).text('Informe de Horarios:', { align: 'left' });

            informeHorarios.forEach(horario => {
                doc.text(`• Nombre: ${horario.nombre},hora inicial: ${horario.horainicial}, hora final: ${horario.horafinal}`);
            });

            doc.end();
        } catch (error) {
            console.error(error);
            res.status(500).send('Error al generar el informe de Horarios');
        }
    }
}
module.exports = horariosController;