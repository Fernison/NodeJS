const { ServiceBroker } = require("moleculer");

const NODE='TCP-0';

const broker = new ServiceBroker({
    logger: true,
    nodeID: NODE,
    metrics: true,
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
    name: "metrics",
    events: {
        "metrics.trace.span.start"(payload) {
          // Inicio de petición
          // this.logger.info(`metrics.trace.span.start event: ${Object.getOwnPropertyNames(payload)}`);
          // this.logger.info(`metrics.trace.span.start event: ${Object.values(payload)}`);
          this.logger.info(`metrics.trace.span.start event: ${printPayload('START', payload)}`);
        },
        "metrics.trace.span.finish"(payload) {
          // Final de petición
          // this.logger.info(`metrics.trace.span.finish event: ${Object.getOwnPropertyNames(payload)}`);
          // this.logger.info(`metrics.trace.span.finish event: ${Object.values(payload)}`);
          this.logger.info(`metrics.trace.span.finish event: ${printPayload('FINISH', payload)}`);
        }
    }
});

broker.start();

printPayload = (type, payload) => {
  // let resp=`Type: ${type}. ID: ${payload.id}. requestID: ${payload.requestID}.
  // NodeID: ${payload.nodeID}. CallerNodeID: ${payload.callerNodeID}.
  // Action: ${Object.values(payload.action)}. Params: ${payload.params!=null?Object.values(payload.params):'NULL'}. Meta: ${payload.meta}`;
  let resp=`${type}. ${payload.requestID}. ${payload.nodeID}. ${payload.callerNodeID}. ${Object.values(payload.action)}. ${payload.startTime}. ${payload.endTime}`;
  return resp;
}
