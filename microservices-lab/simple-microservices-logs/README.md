# NodeJS Microservices Lab

## Simple Microservices Logs

Ejemplo que muestra la integración de un microservicio con el ecosistema Filebeat + ELK (Elastic Search, Logstash, Kibana)
La secuencia es la siguiente:
	`Microservicio ==> fichero_de_logs <== Filebeat ==> Logstash ==> Elasticsearch <== Kibana`

	- Microservicio escribe trazas en el fichero logs.log.
	- Filebeat lee las trazas del fichero de logs.
	-	Filebeat envía las trazas a Logstash.
	- Logstash envía las trazas a Elasticsearch.
	- Las trazas se visualizan con Kibana.

	También se puede hacer este ejemplo prescindiendo de Logstash y que Filebeat envíe las trazas directamente a Elasticsearch.

### Arrancarlo

	- Arrancar docker-compose.yml en el siguiente orden:
		- `docker-compose up -d elasticsearch`
		- `docker-compose up -d kibana`
		- `docker-compose up -d logstash`
		- `docker-compose up -d filebeat`
	- Parrarlo todo:
		- `docker-compose stop`
		- `docker stop $(docker ps -a -q)`
		- `docker rm $(docker ps -a -q)`

### Interés

  - (https://logz.io/blog/filebeat-vs-logstash/) *Filbeat* es un _log file shipper_. *Logstash* es un _aggregator_. Los dos se suelen combinar:
    - Filebeat coge los logs y los envía (normalmente en crudo) a Logstash.
    - Logstash coge esos mensajes, los procesa, filtra, etc., y lo envía a otra fuente, por ejemplo Elasticsearch.
  - Comparativa Fluentd-Logstash: https://www.loomsystems.com/blog/single-post/2017/01/30/a-comparison-of-fluentd-vs-logstash-log-collector
  - Para montar un volumen, la ruta del host tiene que ser absoluta: `docker run -it --name devtest10 -v d:/temp:/temporalFerni docker.elastic.co/beats/filebeat:6.2.4 /bin/sh`
    - Ejemplo con Filebeat: `docker run --name devtest10 -v d:/workspace/Fernison/NodeJS/microservices-lab/simple-microservices-logs/config/filebeat.yml:/usr/share/filebeat/filebeat.yml docker.elastic.co/beats/filebeat:6.2.4`
  - Parar todos lo contenedores: `docker stop $(docker ps -a -q`.
  - Borrar todos los contenedores: `docker rm $(docker ps -a -q`
