const {ObjectID}=require('mongodb');
const jwt=require('jsonwebtoken');
var {Todo}=require('./../../models/todo');
var {User}=require('./../../models/user');

const userOneId=new ObjectID();
const userTwoId=new ObjectID();
const userThreeId=new ObjectID();

// Para que funcione con GET /todos y GET /todos/:id
const todos=[{
  _id: new ObjectID(),
  text: 'First todo',
  _creator: userOneId
},{
  _id: new ObjectID(),
  text: 'Second todo',
  _creator: userOneId
},{
  _id: new ObjectID(),
  text: 'Third todo',
  _creator: userTwoId
}];

const users=[{
    _id: userOneId,
    email: 'userOneMail@test.com',
    password: 'userOnePass',
    tokens: [{
        access: 'auth',
        token: jwt.sign({_id: userOneId, access: 'auth'}, process.env.JWT_SECRET).toString()
      }]
  }, {
    _id: userTwoId,
    email: 'userTwoMail@test.com',
    password: 'userTwoPass',
    tokens: [{
        access: 'auth',
        token: jwt.sign({_id: userTwoId, access: 'auth'}, process.env.JWT_SECRET).toString()
      }]
  }, {
    _id: userThreeId,
    email: 'userThreeMail@test.com',
    password: 'userThreePass'
}];

const populateTodos = (done) => {
  // Borra toda la colección de Todos //
  Todo.remove({}).then(() => {
    return Todo.insertMany(todos)
  }).then(() => done());
  // Se llama a then en lugar de a done directamente (como en el beforeEach de POST) por:
  // you're saving stuff into the database (which is asynchronous),
  // so it takes some time before they're saved and you don't want to call
  // done until they're complete else the test will fail.
};

//  Es mejor hacer así ya que es más rápido en lugar de lo de abajo que es
// muy interesante por lo de Promise.all
// const populateUsers = (done) => {
//   User.remove({}).then(() => {
//     return User.insertMany(users)
//   }).then(() => done());
// };

// Si se hace así, siempre se llama al middleware pre('save') del esquema //
const populateUsers = (done) => {
  // User.remove({}).then(() => {
  //   var userOne=new User(users[0]).save();
  //   var userTwo=new User(users[1]).save();
  //   var userThree=new User(users[2]).save();
  //   // Para esperar a que todas las promesas hayan termiando //
  //   return Promise.all([userOne, userTwo, userThree]);
  // }).then(() => done());
  // Así sí que me funciona, ya que las promesas se van encadenando correctamente
  // Con Promise.all, no me ha funcionado y no guarda la pwd hasheada
  User.remove({}).then(() => {
    return new User(users[0]).save();
  }).then(() => {
    return new User(users[1]).save();
  }).then(() => {
    return new User(users[2]).save();
  }).then(() => done());
}

module.exports={todos, users, populateTodos, populateUsers};
