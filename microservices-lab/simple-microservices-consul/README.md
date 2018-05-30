# NodeJS Microservices Lab

## Simple Microservices Consul

Este ejemplo se integra con Consul:
	-	Se autoregistra en Consul.
	-	Envía a Consul un keep alive para que COnsul sepa que el servicio está vivo.
	-	Escucha cambios en la lista de servicios registrados en Consul.
	-	Recibe una petición en  `http://localhost:3003/test` y la redirige a `http://localhost:3003/health` pero buscando por el ID con el que fue registrado el servicio en Consul

### Arrancarlo

	- Primero arrancar Consul: `docker run -p 8500:8500 consul`.
	- Arrancar la aplicación: `npm start`
