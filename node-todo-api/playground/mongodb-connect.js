// Cojemos el objeto MongoClient de la libreria mongodb
//const MongoClient=require('mongodb').MongoClient;

// Usando Object deestructuring //
// Se cogen los objetos que interesan. En este caso MongoClient y ObjectID
// Se usa también para transformas en objetos el contenido de arrays
// que nos permite consultar por ID y crear ID únicos por si lo queremos usar para algo //
const {MongoClient, ObjectID}=require('mongodb');

var obj=new ObjectID();
console.log(obj);

// Object deestructuring. caracteristica de ES6 //
// Saca a una variable una propiedad de un objeto o un objeto entero //
var user={name: 'nombre apellido', age: 34, location: 'Barbastro'};
var {name}=user;
console.log(name);

MongoClient.connect('mongodb://127.0.0.1:27017/TodoApp', (err, db) => {
  if(err) {
    // Con return lo que se hace es que no se ejecutan el resto de sentencias //
    return console.log('Error connecting to the MongoDB', err);
  }
  console.log('Connected to MongoDB');

  // Insertar datos //
  // El parametro que recibe es el nombre de la colección. Si no existe, lo crea //
  // insertOne inserta un documento
  // db.collection('Todos').insertOne({
  //   text: 'Something to do',
  //   completed: false
  // }, (err, result) => {
  //   if(err) {
  //     // Con return lo que se hace es que no se ejecutan el resto de sentencias //
  //     return console.log('Unable to insert Todo', err);
  //   }
  //   // Muestra en formato JSON el resultado de la operación //
  //   // ops contiene todos los documentos que fueron insertados //
  //   console.log(JSON.stringify(result.ops, undefined, 2));
  // });

  // Insertar documento en la coleccion Users //
  // Propiedades (name, age, location)
  db.collection('Users').insertOne({
    // aunque no se indoque el _id, mongo lo pone por defecto.
    // Podemos ponerlo nosotros también y asñi crear id customizados
    name: 'Krispin Klander',
    age: 56,
    location: 'Barbate'
  }, (err, result) => {
    if(err) {
      // Con return lo que se hace es que no se ejecutan el resto de sentencias //
      return console.log('Unable to insert User', err);
    }
    // Muestra en formato JSON el resultado de la operación //
    // ops contiene todos los documentos que fueron insertados //
    console.log(JSON.stringify(result.ops, undefined, 2));
    console.log(result.ops[0]._id.getTimestamp());
  });

  // Cierra la conexión con MongoDB //
  db.close();
});
