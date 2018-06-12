const { ServiceBroker } = require("moleculer");

const NODE='NATS-2';

const broker = new ServiceBroker({
    logger: true,
    nodeID: NODE,
    transporter: "nats://localhost:4222"
});

broker.createService({
  name: "math",
  events: {
      // Subscribe to "math.sub" event
      "my_evento"(payload) {
          this.logger.info(`${NODE}. my_evento event: ${payload}`);
      },
      // Subscribe to a local event
      "$node.connected"({ node }) {
          this.logger.info(`Node '${node.id}' is connected!`);
      }
  },
  actions: {
    add(ctx) {
      let res=`${NODE}. Res-> ${Number(ctx.params.a) + Number(ctx.params.b)}`;
      console.log(res);
      return res;
    }
  }
});

// Start server
broker.start();
