// Application root //
// Load configuraction //
require('./config/config');

// External imports //
const express=require('express');
const bodyParser=require('body-parser');
const consul = require('consul')();
const os = require('os');
const uuid = require('uuid');
const routesAPI = require('./api/routes');
const healthAPI = require('./api/health');
const consulInit = require('./consul/consul-init');
const consulWatcher = require('./consul/consul-watcher');
const {watch} = require('./consul/consul-watcher');
var {consulDataInstances} = require('./consul/consul-watcher');

const PID = process.pid;
const PORT = process.env.PORT || 3000;
const HOST = os.hostname();
//const CONSUL_ID = `data-${HOST}-${PORT}-${uuid.v4()}`;
const CONSUL_ID = `data-Service1`;

var app=express();

// Middleware configuration //
// Parser body in JSON format //
app.use(bodyParser.json());

// Load health API endpoint //
healthAPI(app);
// Load routes API endpoint //
routesAPI(app, CONSUL_ID, consulDataInstances);

// Server start //
app.listen(PORT, () => {
  // Propiedades JSON compatibles con Consul 1.1.0 //
  let details = {
    "ID": CONSUL_ID,
    "Name": "data",
    "Tags": [
      "primary",
      "v1"
    ],
    "Address": HOST,
    "Port": Number(PORT),
    "Meta": {
      "data_version": '4.0'
    },
    "EnableTagOverride": false,
    "check": {
        "ttl": "30s",
        "deregister_critical_service_after": "1m"
    }
  }

  console.log(`PID: ${PID}, PORT: ${PORT}, ID: ${CONSUL_ID}`);
  consulInit(consul, details, CONSUL_ID);
  watch(consul);
  console.log(`Server listening on port ${PORT}`);
});

module.exports= {app};
