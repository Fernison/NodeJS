# Moleculer Demo

## Ejemplos

### moleculer-simple (moleculer-simple.js)

Ejemplo sencillo que arranca un servicio (sin publicar en ningún puerto) y lo invocar

### moleculer-web (moleculer-web.js)

Publica un servicio REST con varios endpoints:
`
"GET /test"
"POST /mult"
"POST /test"
"POST /comb"
`
Desde "/comb" se invoca internamente (sin llamada HTTP) al servicio "/add".

#### Interés

Para publicar un servicio por http hay que usar _moleculer-web_: `npm i moleculer-web`.

### moleculer-tcp (moleculer-tcp1.js y moleculer-tcp2.js)

Consta de dos nodos: TCP-1 y TCP-2
Ambos publican un servicio: "math".
El nodo TCP-1 publica dos servicios REST:
`
"GET /test"
"GET /sub"
`
En /test invoca de forma síncrona, vía protocolo TCP, al servicio "math.add" del nodo TCP-2.
En /sub envía un evento que es recibido por el nodo TCP-2.
Cuando arranca el broker, envía un evento de conexión al nodo TCP-2.

### moleculer-nats (moleculer-nats1.js y moleculer-nats2.js)

Lo primero que hay que hacer es arrancar el NATS Server (https://nats.io/download/nats-io/gnatsd/):
        `docker run -d --name nats-main -p 4222:4222 -p 6222:6222 -p 8222:8222 nats`

Consta de dos nodos: NATS-1 y NATS-2
Ambos publican un servicio: "math".
El nodo NATS-1 publica dos servicios REST:
`
"GET /test"
"GET /sub"
`
En /test invoca de forma síncrona, vía NATS, al servicio "math.add" del nodo NATS-2.
En /sub envía un evento que es recibido por el nodo NATS-2.
Cuando arranca el broker, envía un evento de conexión al nodo NATS-2.

#### Interés

Para utilizar NATS hay que instalar el paquete _nats_: `npm install nats --save`.

### moleculer-redis (moleculer-redis1.js y moleculer-redis2.js)

Lo primero que hay que hacer es arrancar REDIS:
        `docker run --name some-redis -d redis`

Consta de dos nodos: REDIS-1 y REDIS-2
Ambos publican un servicio: "math".
El nodo REDIS-1 publica dos servicios REST:
`
"GET /test"
"GET /sub"
`
En /test invoca de forma síncrona, vía REDIS, al servicio "math.add" del nodo REDIS-2.
En /sub envía un evento que es recibido por el nodo REDIS-2.
Cuando arranca el broker, envía un evento de conexión al nodo REDIS-2.

#### Interés

Para utilizar REDIS hay que instalar el paquete _ioredis_: `npm install ioredis --save`.
