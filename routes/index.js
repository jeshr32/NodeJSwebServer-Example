var express = require('express');
var router = express.Router();

// conexion a mongo
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("Conectado");
});

//creacion de schema para mongo
var usuarioSchema = mongoose.Schema({
    nombre: String,
    apellido: String,
    usuario: String,
    password: String,

});

var User = mongoose.model('User', usuarioSchema);

//permitir acceso
router.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

/* rutas. */
//Ruta principal
router.get('/usuario', function(req, res, next) {
  User.find(function (err, usuarios) {
  if (err) return console.error(err);
  res.send(usuarios);
})

});

//traer datos
router.get('/usuario/:id', function(req, res, next) {
  User.findById(req.params.id,function (err, usuarios) {
  if (err) return console.error(err);
  res.send(usuarios);
})

});



//guardar datos
router.post('/usuario', function(req, res, next) {

    var nombreBdy = req.body.nombre;
    var apellidoBdy = req.body.apellido;
    var usuarioBdy = req.body.usuario;
    var passwordBdy = req.body.password;


    var usuariomongo = new User({
       nombre: nombreBdy,
       apellido: apellidoBdy,
       usuario: usuarioBdy,
       password: passwordBdy
     });

     usuariomongo.save(function (err,usuario ){
       if (err) return console.error(err);
       console.log('ingreso de datos satisfactorio');
       res.send({result: "oka"});
     });


});

//actualiza datos
router.put('/usuario/:id', function(req, res, next) {

      User.findByIdAndUpdate(req.params.id,
        {
          nombre: req.body.nombre ,
          apellido: req.body.apellido ,
          usuario: req.body.usuario ,
          password: req.body.password
        },
        function(err){if(err) return console.error(err);
        res.send({result: "oka"});
      });



});


//delete datos
router.delete('/usuario/:id', function(req, res, next) {
  User.find({ _id:req.params.id }).remove().exec(function(err){
    if(err) return console.error(err);
    res.send({result: "correctamente"});


  });
});


module.exports = router;
