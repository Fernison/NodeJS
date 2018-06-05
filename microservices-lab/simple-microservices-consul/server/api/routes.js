const status = require('http-status')
const rp = require('request-promise');

module.exports = (app, consulDataInstances, consul) => {

  app.get('/test/:service', (req, res) => {

    // No puedo hacer esto porque consul.kv.get trabaja con callbacks //
    /*
    let value=valueKV('servicio');
    console.log('value: '+value);
    */

    consul.kv.get(req.params.service, (err, result) => {
      if (err) throw err;
      console.log(result);
      if(result===undefined) {
        res.json({
          error: 'No service found'
        });;
      } else {
        consulDataInstances(result.Value, (err, result) => {
          if (err) {
            res.json({
              error: 'No service found in Consul'
            });;
          } else {
            var options = {
                method: 'GET',
                uri: `http://${result.address}:${result.port}/health`,
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
          }
        });
      }
    });
  });

}
