module.exports = (consul, details, CONSUL_ID) => {

  consul.agent.service.register(details, err => {
    if (err) {
      throw new Error(err);
    }
    console.log('registered with Consul');

    setInterval(() => {
      consul.agent.check.pass({id:`service:${CONSUL_ID}`}, err => {
        if (err) throw new Error(err);
        // console.log('told Consul that we are healthy');
      });
    }, 5 * 1000);

    process.on('SIGINT', () => {
      console.log('SIGINT. De-Registering...');
      let details = {id: CONSUL_ID};
      consul.agent.service.deregister(details, (err) => {
        console.log('de-registered.', err);
        process.exit();
      });
    });
  });

}
