// Application root //
// Load configuraction //
require('./config/config');

// External imports //
const express=require('express');
const bunyan = require('bunyan');
const bodyParser=require('body-parser');
// Internal imports //
const routesAPI = require('./api/routes');

const PORT=process.env.PORT || 3000;

var app=express();

var log = bunyan.createLogger({
  name: 'myApp',
  streams: [{
        stream: process.stdout,
        level: 'debug'
    }]
});

// Middleware configuration //
// Parser body in JSON format //
app.use(bodyParser.json());

// MW que se ejecuta en todas las peticiones //
prueba = (param) => {
  return (req, res, next) => {
    console.log(param);
    next();
  }
};
app.use(prueba('Intercepta?'));

// Load middlewares after log //
const mw=require('./middleware/middleware')(log);
const {mw_function_1}=require('./middleware/middleware');

// Load sample routes API endpoint //
routesAPI(app, mw_function_1, log);

// Server start //
app.listen(PORT, () => {
  log.info(`Server listening on port ${PORT}`);
});

module.exports= {app};
