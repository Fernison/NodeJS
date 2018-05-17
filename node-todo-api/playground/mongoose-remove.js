const {ObjectID}=require('mongodb');

const {mongoose}=require('./../server/db/mongoose');
const {Todo}=require('./../server/models/todo');
const {User}=require('./../server/models/user');

// Todo.remove({}).then((docs) => {
//   console.log(docs);
// });

// Se le pasa un query object //
Todo.findOneAndRemove({
  _id: new ObjectID('5a31592e56d6c06a00c5275d')
}).then((doc) => {
  console.log('findOneAndRemove Removed: ', doc);
}).catch((err) => {
  console.log('findOneAndRemove Error: ', err);
});

// Se le pasa el valor del id //
Todo.findByIdAndRemove('5a31592e56d6c06a00c5275e').then((doc) => {
  console.log('findByIdAndRemove Removed: ', doc);
}).catch((err) => {
  console.log('findByIdAndRemove Error: ', err);
});
