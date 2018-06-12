const { ServiceBroker } = require("moleculer");
const ApiService = require("moleculer-web");
const broker = new ServiceBroker({ logger: console });

// Load API Gateway
broker.createService({
//  [name] puede sobrar
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
             "POST /mult": "math.mult"
          }
      }]
  },
  events: {
      "metrics.trace.span.start"(payload) {
        // Inicio de petición
        this.logger.info(`metrics.trace.span.start event: ${Object.getOwnPropertyNames(payload)}`);
        this.logger.info(`metrics.trace.span.start event: ${Object.values(payload)}`);
        this.logger.info(`metrics.trace.span.start event: ${printPayload(payload)}`);
      },
      "metrics.trace.span.finish"(payload) {
        // Final de petición
        this.logger.info(`metrics.trace.span.finish event: ${Object.getOwnPropertyNames(payload)}`);
        this.logger.info(`metrics.trace.span.finish event: ${Object.values(payload)}`);
        this.logger.info(`metrics.trace.span.finish event: ${printPayload(payload)}`);
      }
  },
  actions: {
    import: {
      metrics: {
        // add `ctx.params` to metrics payload. Default: false
        params: true,
        // Add `ctx.meta` to metrics payload. Default: true
        meta: false
      },
      handler(ctx) {
        // ...
        console.log(`***************** handler ${ctx} ***********************`);
        return ctx;
      }
    },
    add(ctx) {
      return Number(ctx.params.a) + Number(ctx.params.b);
    },
    mult: { // Con POST pasando un objeto simple JSON
			params: {
			     a: { type: "number", convert: true },
				   b: { type: "number", notEqual: 0, convert: true }
			},
			handler(ctx) {
				return Number(ctx.params.a) * Number(ctx.params.b);
      }
    }
  }
});

// Start server
broker.start();
