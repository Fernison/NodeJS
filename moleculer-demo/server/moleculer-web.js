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
             "POST /mult": "math.mult",
             "POST /test": "math.div",
             "POST /comb": "math.comb"
          }
      }]
  },
  actions: {
    // La URL para invocar a esta acción es:
    //  http://localhost:3003/api/api/add?a=25&b=13
    //  http://localhost:3003/[path]/[name]/[action]?a=25&b=13
    // Si se usa el alias anterior, la URL es:
    //  http://localhost:3003/api/test?a=25&b=13
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
    },
    div: { // Con POST pasando un objeto más complejo JSON
			params: {
				data: { type: "object", props: {
          a: { type: "number", convert: true },
				  b: { type: "number", notEqual: 0, convert: true }
        }}
			},
			handler(ctx) {
				let a = Number(ctx.params.data.a);
				let b = Number(ctx.params.data.b);
				if (b != 0 && !Number.isNaN(b))
					return a / b;
				else
					//throw new MoleculerError("Divide by zero!", 422, null, ctx.params);
          console.log('else');
			}
		},
    comb: { // Con POST llamando internalmente a otro servicio
      params: {
			     a: { type: "number", convert: true },
				   b: { type: "number", notEqual: 0, convert: true }
			},
      async handler(ctx) {
        let a = Number(ctx.params.a);
        let b = Number(ctx.params.b);
        let resp;
        if (b != 0 && !Number.isNaN(b)) {
          // var res=await broker.call("math.add", { a: a, b: b });
          // resp=`suma: ${res}, div: ${a / b}`;
          // Para capturar errores con "await" es mejor usarlo junto a la
          // sintaxis de promesas: then(...).catch(...)
          await broker.call("math.add", { a: a, b: b })
          .then(res => {
            resp=`suma: ${res}, div: ${a / b}`;
          })
          .catch(err => console.error(`Error occured! ${err.message}`));
          return resp;
        } else {
          //throw new MoleculerError("Divide by zero!", 422, null, ctx.params);
          console.log('else');
        }
      }
    }
  }
});

// Start server
broker.start();
