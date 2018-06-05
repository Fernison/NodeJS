// Application root //
// Load configuraction //
require('./config/config');

// External imports //
const express=require('express');
const bunyan = require('bunyan');
const bodyParser=require('body-parser');
const routesAPI = require('./api/routes')

var log = bunyan.createLogger({
  name: 'myApp',
  streams: [{
        path: './logs/logs.log',
        level: 'debug'
    }]
});

var app=express();

const PORT=process.env.PORT || 3000;

// Middleware configuration //
// Parser body in JSON format //
app.use(bodyParser.json());

// Load routes API endpoint //
routesAPI(app, log);

// Server start //
app.listen(PORT, () => {
  log.info(`Server listening on port ${PORT}`);
});

module.exports= {app};
