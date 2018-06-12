const { ServiceBroker } = require("moleculer");
const ApiService = require("moleculer-web");

const NODE='TCP-1';

const broker = new ServiceBroker({
    logger: true,
    nodeID: NODE,
    transporter: {
        type: "TCP",
        options: {
            // Enable UDP discovery
            udpDiscovery: true,
            // Reusing UDP server socket
            udpReuseAddr: true,
            // UDP port
            udpPort: 4445,
            // UDP bind address (if null, bind on all interfaces)
            udpBindAddress: null,
            // UDP sending period (seconds)
            udpPeriod: 30,
            // Multicast address.
            udpMulticast: "239.0.0.0",
            // Multicast TTL setting
            udpMulticastTTL: 1,
            // Send broadcast (Boolean, String, Array<String>)
            udpBroadcast: false,
            // TCP server port. Null or 0 means random port
            port: 6000,
            // Static remote nodes address list (when UDP discovery is not available)
            urls: null,
            // Use hostname as preffered connection address
            useHostname: true,
            // Gossip sending period in seconds
            gossipPeriod: 2,
            // Maximum enabled outgoing connections. If reach, close the old connections
            maxConnections: 32,
            // Maximum TCP packet size
            maxPacketSize: 1 * 1024 * 1024
        }
    }
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
      // Llama al servicio "math.add" del nodo TCP-2 por TCP y de forma interna //
      await broker.call("math.add", { a: ctx.params.a, b: ctx.params.b }, { nodeID: "TCP-2" })
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
  },
  /**
  * Service created lifecycle event handler
  */
  created() {
    console.log('Service created');
  },
  /**
   * Service started lifecycle event handler
   */
  started() {
    console.log('Service started');
  },
  /**
   * Service stopped lifecycle event handler
   */
  stopped() {
    console.log('Service stopped');
  }
});

// Start server
broker.start()
  // Lanza un evento cuando se conecta //
  .then(() => broker.emit("$node.connected"));
