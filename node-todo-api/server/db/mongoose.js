// Fichero para inicializar la configuración de Mongoose //

var mongoose=require('mongoose');

// Se le dice a Mongo que librería de Promesas se van a utilizar.
// Se utiliza la por defecto //
mongoose.Promise=global.Promise;
// Se conecta a Mongo //
mongoose.connect(process.env.MONGODB_URI);

// Realiza acciones una vez conectado Mongo //
// En este caso, imprime la versión //
mongoose.connection.on('open', function() {
  mongoose.connection.db.admin().serverStatus(function(error, info) {
    console.log(`MongoDb version: ${info.version}`);
  });
});

// Es necesario exportar el objeto para usarlo fuera de este fichero. //
// Esta forma es ES6 //
module.exports= {mongoose};
// Esto valdria? //
//module.exports.mongoose=mongoose;
