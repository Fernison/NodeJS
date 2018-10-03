const kafka = require('kafka-node');

var Producer = kafka.Producer;
var KeyedMessage = kafka.KeyedMessage;
console.log('KAFKA_HOST: ',process.env.KAFKA_HOST);
var options = {
  kafkaHost: process.env.KAFKA_HOST
};
var clientProducer = new kafka.KafkaClient(options);
var producer = new Producer(clientProducer);

producer.on('error', err => {
  console.log(err);
});

var Consumer = kafka.Consumer;
var clientConsumer = new kafka.KafkaClient(options);
var consumer = new Consumer(
    clientConsumer,
    [
        { topic: 'topic1', partition: 0 }, { topic: 'topic2'}
    ],
    {
        autoCommit: false
    }
);

module.exports={producer, consumer};
