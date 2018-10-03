const status = require('http-status')




module.exports = (app, my_function_1, log) => {

  app.get('/test', my_function_1, (req, res) => {
    log.debug('Test invoked');
    res.status(status.OK).send('Everything OK :)');
  });

}
