const {ObjectID}=require('mongodb');
//ObjectId.isValid

const {mongoose}=require('./../server/db/mongoose');
const {Todo}=require('./../server/models/todo');
const {User}=require('./../server/models/user');

var id='5a3133777f9b63046425ea6f';

if(!ObjectID.isValid(id)) {
  console.log('ID not valid');
}

// Se obtienen todos los que cumplen con la condicion (query object) //
Todo.find({
  _id: id
}).then((todos) => {
  console.log('find:', todos);
}).catch((err) => {
  console.log('Find error: ', err);
});

// Se devuelve el primero que se obtiene de la consulta //
Todo.findOne({
  _id: id
}).then((todos) => {
  console.log('findOne:', todos);
}).catch((err) => {
  console.log('findOne error: ', err);
});

// Busca sólo por ID. No hace falta query object //
Todo.findById(id).then((todos) => {
  if(!todos) {
    // No hay resultados //
    return console.log('Id not found');
  }
  console.log('findById:', todos);
}, (err) => { // Es igual que hacerlo con then...catch //
  console.log('findById error: ', err);
});

// User.findById
  // User found
  // Query works but not user
  // Error ocurred
var id_user='5a300b9b524088484f45cd58';

// Busca sólo por ID. No hace falta query object //
User.findById(id_user).then((user) => {
  if(!user) {
    // No hay resultados //
    return console.log('User not found');
  }
  console.log('User findById:', user);
}).catch((err) => {
  console.log('User findById error: ', err);
});
