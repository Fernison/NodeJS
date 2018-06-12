const { ServiceBroker } = require("moleculer");
const ApiService = require("moleculer-web");

const NODE='NATS-1';

const broker = new ServiceBroker({
    logger: true,
    nodeID: NODE,
    transporter: "nats://localhost:4222"
});

broker.createService({
  name: "math",
  mixins: [ApiService],
  settings: {
      port: process.env.PORT || 3003,
      routes: [{
          path: "/api",
          whitelist: [
            // Access to any actions in all services under "/api" URL
    				"*"
          ],
          bodyParsers: {
            json: true,
            urlencoded: { extended: true }
          },
          aliases: {
             "GET /test": "math.add",
             "GET /sub": "math.sub"
          }
      }]
  },
  actions: {
    async add(ctx) {
      let resp='';
      // Llama al servicio "math.add" del nodo NATS-2 por NATS y de forma interna //
      await broker.call("math.add", { a: ctx.params.a, b: ctx.params.b }, { nodeID: "NATS-2" })
        .then(res => resp=`${NODE}. Result: ${res}`)
        .catch(err => resp=`Error occured! ${err.message}`);
      return resp;
    },
    sub(ctx) {
      let resta=Number(ctx.params.a) - Number(ctx.params.b);
      // Lanza un evento indicando que se ha invocado esta operacion //
      broker.emit("my_evento", resta);
      return resta;
    }
  }
});

// Start server
broker.start()
  // Lanza un evento cuando se conecta //
  .then(() => broker.emit("$node.connected"));
