var env=process.env.NODE_ENV || 'development';
console.log(`Starting server.js in ${env}`);

// Carga el fichero de configuración en función del entorno //
if(env==='development' || env==='test') {
  var config=require('./config.json'); // automaticmante se  mapea el contenido en un objetos
  var envConfig=config[env]; // Obtiene los atributos del entorno almacenado en envía
  // Obtiene las claves del properties y se recorren //
  Object.keys(envConfig).forEach((key) => {
    // Guarda los valores en variables de entorno //
    process.env[key]=envConfig[key]
  });

}

// if(env==='development') {
//   process.env.PORT=3000;
//   process.env.MONGODB_URI='mongodb://127.0.0.1:27017/TodoApp';
// } else if(env==='test') {
//   process.env.PORT=3000;
//   process.env.MONGODB_URI='mongodb://127.0.0.1:27017/TodoAppTest';
// } else {
//   process.env.MONGODB_URI='mongodb://node:secreta@ds135916.mlab.com:35916/todoapp';
// }
