const status = require('http-status')
const rp = require('request-promise');

module.exports = (app, CONSUL_ID, consulDataInstances) => {

  app.get('/test', (req, res) => {
    var service=consulDataInstances().get(CONSUL_ID);
    // console.log('ID: '+ service.id);
    var options = {
        method: 'GET',
        uri: `http://${service.address}:${service.port}/health`,
        json: true // Automatically stringifies the body to JSON
    };
    rp(options)
        .then(parsedBody => {
            // POST succeeded...
            res.json({
              data: Math.floor(Math.random() * 89999999 + 10000000),
              data_pid: parsedBody
            });
        })
        .catch(err => {
            // POST failed...
            console.log(err);
        });
  });

}
