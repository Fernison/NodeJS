const status = require('http-status')

module.exports = (app, log) => {

  app.get('/test', (req, res) => {
    log.debug('Test endpoint invoked');
    res.status(status.OK).send('Everything OK :)');
  });

}
