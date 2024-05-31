// app.js

const express = require('express');
const session= require('express-session');
const passport= require('passport');
const cookieParser= require('cookie-parser');
const PassportLocal= require('passport-local').Strategy;
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
app.use(express.json());

// Configuración de bodyParser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Configurar el motor de plantillas EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


// Middleware para servir archivos estáticos
app.use(express.static(path.join(__dirname, 'views')));
app.use('/views', express.static(path.join(__dirname, 'views')));

app.use(express.urlencoded({extended:true}))
app.use(cookieParser('mi secreto'))
app.use(session({
    secret:'mi secreto',
    resave: true,
    saveUninitialized:true
}))
app.use(passport.initialize())
app.use(passport.session())

passport.use(new PassportLocal(function(username,password,done){

    if (username=="Mateo@" && password=="12345"){
        return done(null,{id:1,name:"Mateo"})
    }
    done(null,false)
}))

// {id:1,name:"Mateo"}
// 1=> Serializacion
passport.serializeUser(function(user,done){
  done(null.user.id)
})
//Deserializacion
passport.deserializeUser(function(id,done){
  done(null,{id:1,name:"Mateo"})
})


/////////////////////RUTAS///////////////////////////
// Ruta de autenticacion
app.get("/Auth",(req,res)=>{
  res.render("Auth")   
})
// Ruta de inicio
app.get("/",(req,res,next)=>{
  if(req.isAuthenticated())return next()    
      res.redirect("/Auth")
},(req,res)=>{
  res.sendFile(path.join(__dirname, 'views', 'index.html'));
})

// app.get('/', (req, res) => {
//   res.sendFile(path.join(__dirname, 'views', 'index.html'));
// });



// USUARIOS
const UsuariosController = require('./controllers/usuariosController');
app.get('/usuarios', UsuariosController.mostrarTodos);
app.post('/usuarios/agregar', UsuariosController.agregarUsuario);
app.post('/usuarios/actualizar/:id', UsuariosController.actualizarUsuario);
app.get('/usuarios/eliminar/:id', UsuariosController.eliminarUsuario);


app.post("/Auth",passport.authenticate('local',{
  successRedirect:"/",
  failureRedirect:"/Auth"
}))

// Puerto e inicio
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
