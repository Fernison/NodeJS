const {MongoClient, ObjectID}=require('mongodb');

var obj=new ObjectID();
console.log(obj);

MongoClient.connect('mongodb://127.0.0.1:27017/TodoApp', (err, db) => {
  if(err) {
    // Con return lo que se hace es que no se ejecutan el resto de sentencias //
    return console.log('Error connecting to the MongoDB', err);
  }
  console.log('Connected to MongoDB');

  // deleteMany para borrar varios //
  // db.collection('Todos').deleteMany({text: 'walk the dog'}, (err, result) => {
  //   if(err) {
  //     return console.log('Unable to delete todos');
  //   }
  //   console.log('Records deleted ', result); // devuelve  result: { n: 0, ok: 1 }, 1 OK y se han borrado 0
  // });

  // deleteOne
  // db.collection('Todos').deleteOne({text: 'play guitar'}, (err, result) => {
  //   if(err) {
  //     return console.log('Unable to delete todos');
  //   }
  //   console.log('Records deleted ', result);
  // });

  // findOneAndDelete borra y devuelve el valor borrado
  // db.collection('Todos').findOneAndDelete({text: 'play guitar'}, (err, result) => {
  //   if(err) {
  //     return console.log('Unable to delete todos');
  //   }
  //   console.log('Records deleted ', result);
  // });

  // Se puede utilizar como Promesa si no se le pasa la callbak //
  db.collection('Users').deleteMany({name: 'Krispin Klander'}).then((result) => {
    console.log('Records deleted ', result); // devuelve  result: { n: 0, ok: 1 }, 1 OK y se han borrado 0
  }, (err) => {
    return console.log('Unable to delete Users');
  });

  // Promesa //
  db.collection('Users').deleteOne({name: 'Muander'}).then((result) => {
    console.log('Records deleted ', result);
  }, (err) => {
    return console.log('Unable to delete Users');
  });

  // Callback //
  db.collection('Users').findOneAndDelete({name: 'Heinz'}, (err, result) => {
    if(err) {
      return console.log('Unable to delete Users');
    }
    console.log('Records deleted ', result);
  });

  // Cierra la conexión con MongoDB //
  //db.close();
});
