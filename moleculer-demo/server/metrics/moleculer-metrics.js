const { ServiceBroker } = require("moleculer");

let broker = new ServiceBroker({
  nodeID: "node-25",
  logger: console,
  metrics: true,
  metricsRate: 1,
  statistics: true, // Si es true habilita el servicio $node.stats
  internalServices: true
});

broker.createService({
    name: "math",
    events: {
        "metrics.trace.span.start"(payload) {
          // Inicio de petición
          // this.logger.info(`metrics.trace.span.start event: ${Object.getOwnPropertyNames(payload)}`);
          // this.logger.info(`metrics.trace.span.start event: ${Object.values(payload)}`);
          this.logger.info(`metrics.trace.span.start event: ${printPayload(payload)}`);
        },
        "metrics.trace.span.finish"(payload) {
          // Final de petición
          // this.logger.info(`metrics.trace.span.finish event: ${Object.getOwnPropertyNames(payload)}`);
          // this.logger.info(`metrics.trace.span.finish event: ${Object.values(payload)}`);
          this.logger.info(`metrics.trace.span.finish event: ${printPayload(payload)}`);
        }
    },
    actions: {
      add: {
        metrics: {
          // add `ctx.params` to metrics payload. Default: false
          params: true,
          // Add `ctx.meta` to metrics payload. Default: true
          meta: true
        },
        handler(ctx) {
          // Así se propaga el mismo ID en la propiedad payload.requestID de los eventos de métricas //
          ctx.parentID=ctx.id;
          //broker.call("math.sub", { name: "John", lastname: "Doe" }, { meta: "meta2" });
          ctx.call("math.sub", { name: "John", lastname: "Doe" }, { meta: "meta2" });
          return 'Number(ctx.params.a) + Number(ctx.params.b)';
        }
      },
      sub: {
        metrics: {
          // add `ctx.params` to metrics payload. Default: false
          params: true,
          // Dont add `ctx.meta` to metrics payload. Default: true
          meta: false
        },
        handler(ctx) {
          /* Bucle infinito ;)
          //ctx.parentID=ctx.id;
          //broker.call("math.sub", { name: "John", lastname: "Doe" }, { meta: "meta2" });
          //ctx.call("math.add", { name: "John" }, { meta: "meta1" });
          */
          return 'Number(ctx.params.a) - Number(ctx.params.b)';
        }
      }
    }
});

broker.start()
    // Call service
    .then(() => broker.call("math.add", { name: "John" }, { meta: "meta1" }))
    // .then(() => broker.call("math.sub", { name: "John", lastname: "Doe" }, { meta: "meta2" }))
    // .then(() => broker.call("$node.stats").then(res => console.log(Object.values(res))))
    ;

printPayload = (payload) => {
  let resp=`ID: ${payload.id}. requestID: ${payload.requestID}. Action: ${Object.values(payload.action)}. Params: ${payload.params!=null?Object.values(payload.params):'NULL'}. Meta: ${payload.meta}`;
  return resp;
}
