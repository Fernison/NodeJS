// Application root //
// Load configuraction //
require('./config/config');

// External imports //
const express=require('express');
const bunyan = require('bunyan');
const bodyParser=require('body-parser');
const routesAPI = require('./api/routes')
const {consumer} = require('./kafka/kafka-init');

var log = bunyan.createLogger({
  name: 'ms-consumer',
  streams: [{
        path: process.env.LOGS_PATH,
        level: 'debug'
    }]
});

var app=express();

const PORT=33003;

// Middleware configuration //
// Parser body in JSON format //
app.use(bodyParser.json());

consumer.on('message', message => {
  console.log(message);
});
consumer.on('error', err => {
  console.log(err);
});

// Server start //
app.listen(PORT, () => {
  log.info(`Server listening on port ${PORT}`);
});

module.exports= {app};
