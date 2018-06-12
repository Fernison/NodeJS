const { ServiceBroker } = require("moleculer");

const NODE='TCP-2';

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
            port: 6001,
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
