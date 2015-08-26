//Declaracion de modulos dependientes y variables
var express = require('express'),
	bodyParser = require('body-parser'),
	http = require('http'),
	app,
	router,
	server;

	//Crear una instancia del framework 'express'
	app = express();
	app.use(bodyParser.json());


	//crear un objeto tipo express.Router para procesar las peticiones

	router = express.Router();
	router.get('/', function (req,res){
		res.json(
			[
			{
				id:1,
				mensaje:'Suma'
			},
			{
				id:2,
				mensaje:'Resta'
			}


			]);

	});

	//Publicar la url /suma
	app.use('/suma',router);

	//Crear servidor http , que utiliza la instancia de express
	
	server = http.createServer(app);

	//iniciar server

	server.listen(3000, function(){
		console.log('localhost:3000/suma');
	});



