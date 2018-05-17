const {MongoClient, ObjectID}=require('mongodb');

var obj=new ObjectID();
console.log(obj);

MongoClient.connect('mongodb://127.0.0.1:27017/TodoApp', (err, db) => {
  if(err) {
    // Con return lo que se hace es que no se ejecutan el resto de sentencias //
    return console.log('Error connecting to the MongoDB', err);
  }
  console.log('Connected to MongoDB');

  // db.collection('Todos').findOneAndUpdate({
  //   _id: new ObjectID('5a2fc2c760acdf7299862d57')
  // }, {
  //   // Es un Update operator de Mongo. Ver lista en https://docs.mongodb.com/v3.4/reference/operator/update/  //
  //   $set: {
  //     completed: true
  //   }
  // }, {
  //   // Devuelve el documento ya actualizado //
  //   returnOriginal: false
  // })
  // .then((result) => {
  //   console.log(result);
  // }, (err) => {
  //   console.log('Unable to update Todo', err);
  // });

  db.collection('Users').findOneAndUpdate({
    _id: new ObjectID('5a2fe4d785f6b608f80d4a3a')
  }, {
    // Es un Update operator de Mongo. Ver lista en https://docs.mongodb.com/v3.4/reference/operator/update/  //
    $set: {
      name: 'Heinz Muander',
      location: 'Arlington'
    },
    $inc: {
      age: 1
    }
  }, {
    // Devuelve el documento ya actualizado //
    returnOriginal: false
  })
  .then((result) => {
    console.log(result);
  }, (err) => {
    console.log('Unable to update user', err);
  });

  // Cierra la conexión con MongoDB //
  //db.close();
});
