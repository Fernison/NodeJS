# NodeJS Microservices Lab

## Async Microservices

Este ejemplo contiene dos microservicios:
  - *ms-producer*: Produce mensajes en una cola Kafka
  - *ms-consumer*: Consume los mensajes producidos por `ms-producer`

### Configuración en Docker-Compose de Zookeeper y Kafka:

```yml
zookeeper:
  image: wurstmeister/zookeeper
  ports:
    - "2181:2181"
  networks:
    service:
      aliases:
        - zookeeper

kafka:
  image: wurstmeister/kafka
  ports:
    - "9092:9092"
  environment:
    HOSTNAME_COMMAND: "getent hosts `hostname` | cut -d' ' -f1"
    KAFKA_AUTO_CREATE_TOPICS_ENABLE: 'true'
    KAFKA_ZOOKEEPER_CONNECT: zookeeper:2181 # Si los MS se ejecutan en el compose
    KAFKA_ADVERTISED_PORT: 9092
    KAFKA_ADVERTISED_HOST_NAME: 127.0.0.1 # Si los MS se ejecutan fuera del compose (la IP del host)
  depends_on:
    - zookeeper
  networks:
    service:
      aliases:
        - kafka
```
