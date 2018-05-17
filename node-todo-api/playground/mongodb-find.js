const {MongoClient, ObjectID}=require('mongodb');

var obj=new ObjectID();
console.log(obj);

MongoClient.connect('mongodb://127.0.0.1:27017/TodoApp', (err, db) => {
  if(err) {
    // Con return lo que se hace es que no se ejecutan el resto de sentencias //
    return console.log('Error connecting to the MongoDB', err);
  }
  console.log('Connected to MongoDB');

  // Es mejor y mas eficiente recuperarlos como un array con toArray,
  // que es una Promesa, y por eso seguimos con then
  // Obtener todos //
  //db.collection('Todos').find().toArray().then((docs) => {
  //  console.log(JSON.stringify(docs,undefined,2));
  // Obtener todos con condicion //
  //db.collection('Todos').find({completed: false}).toArray().then((docs) => {
  //  console.log(JSON.stringify(docs,undefined,2));
  // Obtener un _id determinado //
  //db.collection('Todos').find({
  //  _id: new ObjectID('5a2faa42a7b5c820e0128fae')}).toArray().then((docs) => {
  //  console.log(JSON.stringify(docs,undefined,2));
  // Contarlos
  // db.collection('Todos').find().count().then((count) => {
  //     console.log(`Todos count ${count}`);
  // }, (err) => {
  //   console.log('Unable to fetch todos');
  // });

  // Obtiene todos los que NO son Krispin //
  db.collection('Users').find({name: {'$ne':'Krispin Klander'}}).toArray().then((docs) => {
      console.log(JSON.stringify(docs,undefined,2));
  }, (err) => {
    console.log('Unable to fetch users');
  });

  // Cierra la conexión con MongoDB //
  //db.close();
});
