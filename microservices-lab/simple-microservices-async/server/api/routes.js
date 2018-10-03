const status = require('http-status')

module.exports = (app, kafkaProducer, log) => {

  app.get('/test', (req, res) => {
    log.debug('Test endpoint invoked');
    var payloads = [
            { topic: 'topic1', messages: 'from test', partition: 0 }
        ];
    kafkaProducer.send(payloads, (err, data) => {
        if(err===null) {
          console.log(data);
          res.status(status.OK).send('Everything OK :)');
        } else {
          console.log(err);
          res.status(status.INTERNAL_SERVER_ERROR).send('Everything KO :)');
        }
    });
  });

}
