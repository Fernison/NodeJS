// Application root //
// Load configuraction //
require('./config/config');

// External imports //
const express=require('express');
const bunyan = require('bunyan');
const bodyParser=require('body-parser');
const routesAPI = require('./api/routes')
const {producer} = require('./kafka/kafka-init');

var log = bunyan.createLogger({
  name: 'ms.producer',
  streams: [{
        path: process.env.LOGS_PATH,
        level: 'debug'
    }]
});

var app=express();

const PORT=process.env.PORT || 3000;

// Middleware configuration //
// Parser body in JSON format //
app.use(bodyParser.json());

producer.on('ready', () => {
  // Wen Kafka ready, load routes API endpoint //
  routesAPI(app, producer, log);
});

// Server start //
app.listen(PORT, () => {
  log.info(`Server listening on port ${PORT}`);
});

module.exports= {app};
