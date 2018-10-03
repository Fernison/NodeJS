# NodeJS Microservices Lab

## Simple Microservices Consul

Este ejemplo se integra con Consul:
	-	Se autoregistra en Consul.
	-	Envía a Consul un keep alive para que COnsul sepa que el servicio está vivo.
	-	Escucha cambios en la lista de servicios registrados en Consul.
	-	Funcionamiento del microservicio:
		-	Recibe una petición en  `http://localhost:3003/test/[servicio]`
		- Se busca en Consul la clave indicada en el parámetro "servicio". El valor que se obtiene es el ID del servicoi registrado en Consul.
		- Con ese valor se obtiene la IP y el puerto donde está escuchando el servicio identificado.
		- Se invoca a `http://[IP]:[PUERTO]/health`

### Arrancarlo

	- Primero arrancar Consul: `docker run -p 8500:8500 consul`.
	- Arrancar la aplicación: `npm start`
