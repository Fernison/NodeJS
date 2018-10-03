
module.exports = (app) => {

  app.get('/health', (req, res) => {
    // console.log('GET /health', Date.now());
    res.send('ok');
  });

}
