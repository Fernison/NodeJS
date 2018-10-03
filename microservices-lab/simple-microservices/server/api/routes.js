const status = require('http-status')

module.exports = (app) => {

  app.get('/test', (req, res) => {
    res.status(status.OK).send('Everything OK :)');
  });

}
