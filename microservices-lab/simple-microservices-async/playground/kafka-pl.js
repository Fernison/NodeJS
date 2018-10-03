const kafka = require('kafka-node');

var Producer = kafka.Producer;
var KeyedMessage = kafka.KeyedMessage;
var clientProducer = new kafka.Client();
var producer = new Producer(clientProducer);
var km = new KeyedMessage('key', 'message');
var payloads = [
        { topic: 'topic1', messages: 'hi', partition: 0 },
        { topic: 'topic2', messages: ['hello', 'world', km] }
    ];

producer.on('ready', () => {
    producer.send(payloads, (err, data) => {
        console.log(data);
    });
});

producer.on('error', err => {
  console.log(err);
});

var Consumer = kafka.Consumer;
var clientConsumer = new kafka.Client();
var consumer = new Consumer(
    clientConsumer,
    [
        { topic: 'topic1', partition: 0 }, { topic: 'topic2'}
    ],
    {
        autoCommit: false
    }
);
consumer.on('message', message => {
  console.log(message);
});
consumer.on('error', err => {
  console.log(err);
});
