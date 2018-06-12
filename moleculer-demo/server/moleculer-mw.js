const { ServiceBroker } = require("moleculer");
const ApiService = require("moleculer-web");

const NODE='TCP-1';


// myMiddleware1 = () => {
//   return function (handler) {
// 		return function mw1(ctx) {
//       console.log('myMiddleware1');
// 			return handler(ctx).then(res => {
// 				return res;
// 			});
// 		};
// 	};
// }


// Los MW son Closures //
myMiddleware1 = () => {
  return (handler, action) => {
    // Se ejecuta al CREAR el Broker //
    console.log(`Action ${action.name}`); // Muestra todos los servicios registrados
		return (ctx) => {
      // Se ejecuta ANTES de llamar el servicio //
      console.log(`Action ${action.name}`);
      console.log(`ctx ${ctx.params.a}`);
      ctx.params.a=90; // Se cambia el valor de u parametro antes de invocar al servicio
			return handler(ctx).then(res => {
        // Se ejecuta DESPUÉS de llamar el servicio //
        console.log(`res ${res}`);
				return res;
			});
		};
	};
}


const broker = new ServiceBroker({
    logger: true,
    middlewares: [myMiddleware1()]
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
             "GET /test": "math.add"
          }
      }]
  },
  actions: {
    async add(ctx) {
      return Number(ctx.params.a) + Number(ctx.params.b);
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
