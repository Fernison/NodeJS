// Root de la aplicación //
// Fichero principal que carga la aplicación //

// Lo primero que hacemos es cargar la configuración //
require('./config/config');

// Importaciones externas //
const _=require('lodash');
const express=require('express');
const bodyParser=require('body-parser');
const {ObjectID}=require('mongodb');
const bcrypt = require('bcryptjs');

// Importaciones locales //
// Usando Object deestructuring recuperamos directamente los objetos que se exportan //
var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');
var {authenticate, ejemplo_mw} = require('./middleware/authenticate');

var app=express();

const port=process.env.PORT || 3000;

// Configurar el Middleware //
// Con esto se puede parsear el body en formato JSON //
app.use(bodyParser.json());

// Routes //
// TODO //
// POST /todos para crear Todos //
// Tiene que estar logado, por eso se llama al MW authenticate //
// Se añade otro mw de ejemplo para que se vea como se llaman en orden //
// app.post('/todos', authenticate, ejemplo_mw, (req, res) => {
//   // Mediante bodyparser, ya se muestra en formato JSON //
//   var todo=new Todo({
//     text: req.body.text,
//     _creator: req.user._id // User viene del middleware
//   });
//   todo.save().then((todo) => {
//     //console.log(`Successfully saved Todo ${doc}`);
//     res.send(todo);
//   }, (err) => {
//     //console.log(`Error saving Todo ${req}`);
//     res.status(400).send(err);
//   });
// });

// Con async await //
app.post('/todos', authenticate, ejemplo_mw, async (req, res) => {
  try {
    var todo=new Todo({
      text: req.body.text,
      _creator: req.user._id // User viene del middleware
    });
    await todo.save();
    res.send(todo);
  } catch(e) {
    res.status(400).send(e);
  }
});

// GET /todos para obtener todos los Todos
app.get('/todos', authenticate, (req, res) => {
  Todo.find({
    _creator: req.user._id // Se buscan los todos del usuario logado
  }).then((todos) => {
    res.send({todos}); // Hay que ponerlo entre {} para que devuelva
                       // un objeto al que le podremos añadir, ademas de Todos
                       // otros valores que interesen (códigos, errores, etc.)
  }, (err) => {
    res.status(400).send(err);
  });
});

// GET /todos/:id para obtener un Todo a partir de su id
app.get('/todos/:id', authenticate, (req, res) => {
  var id=req.params.id;
  if(!ObjectID.isValid(id)) {
    return res.status(404).send();
  }
  //Todo.findById(id).then((todo) => {
  Todo.findOne({
    _id: id,
    _creator: req.user._id // Se buscan los todos del usuario logado
  }).then((todo) => {
    if(!todo) {
      // No hay resultados //
      return res.status(404).send(`Id ${req.params.id} not found`);
    }
    res.send({todo});
  }, (err) => {
    res.status(400).send();
  });
});

// DELETE /todos/:id para borrar un Todo a partir de su id
// app.delete('/todos/:id', authenticate, (req, res) => {
//   var id=req.params.id;
//   if(!ObjectID.isValid(id)) {
//     return res.status(404).send();
//   }
//
//   // Borrado con condicion general //
//   //Todo.remove({_id}).then((todo) => {
//   // Mejor utilizar este metodo para borrar un solo documento //
//   Todo.findOneAndRemove({
//     _id: id,
//     _creator: req.user._id // Se buscan los todos del usuario logado
//   }).then((todo) => {
//     if(!todo) {
//       // No hay resultados //
//       return res.status(404).send(`Id ${id} not found`);
//     }
//     res.send({todo});
//   }, (err) => {
//     res.status(400).send();
//   });
// });

// Con async await //
app.delete('/todos/:id', authenticate, async (req, res) => {
  try {
    const id=req.params.id;
    if(!ObjectID.isValid(id)) {
      return res.status(404).send();
    }
    const todo=await Todo.findOneAndRemove({
        _id: id,
        _creator: req.user._id // Se buscan los todos del usuario logado
      });
      if(!todo) {
        // No hay resultados //
        return res.status(404).send(`Id ${id} not found`);
      }
      res.send({todo});
  } catch(e) {
    res.status(400).send();
  }
});

// PATCH /todos/:id para actualizar un Todo a partir de su id
app.patch('/todos/:id', authenticate, (req, res) => {
  var id=req.params.id;
  // El metodo pick coge solo los atributos de un objeto que le digamos
  // los atributos son los que están en el array (text y completed)
  // Devuelve un objeto con los atributos que le hemos dicho //
  var body=_.pick(req.body, ['text', 'completed']);

  if(!ObjectID.isValid(id)) {
    return res.status(404).send();
  }

  // Comprobamos si body.completed es boolean y si es true //
  if(_.isBoolean(body.completed) && body.completed) {
    // Se actualiza completedAt //
    // En body añadimos dinamicamente el atributo completedAt
    body.completedAt=new Date().getTime(); // GetTime Devuelve la fecha en milisengudos
  } else {
    body.completed=false;
    body.completedAt=null;
  }

  Todo.findOneAndUpdate({
    _id: id,
    _creator: req.user._id // Se buscan los todos del usuario logado
  }, {
    $set: body // Directamente actualizamos el objeto body
  }, {
    new: true // Devuelve el objeto modificado
  })
  .then((todo) => {
    if(!todo) {
      return res.status(404).send(`Id ${id} not found`);
    }
    res.send({todo});
  })
  .catch((err) => {
    console.log(err);
    res.status(400).send();
  });
});

// USER //
// POST /todos para crear Users //
// app.post('/users', (req, res) => {
//   var body=_.pick(req.body, ['email', 'password']);
//   var user=new User(body);
//   /*
//     user.save() returns a Promise which means you can chain a .then() on
//     to it which will be called once it resolves. If you return something
//     inside of .then(), it returns a Promise (which you can chain again)
//   */
//   user.save().then(() => {
//     // Lo devolvemos con return ya que esperamos encadenar una promesa //
//     // En este caso es para que si hay error lo capture el catch de abajo //
//     return user.generateAuthToken().then((token) => {
//       // Se crea la cabecera en la respuesta con el token //
//       // Se envía el user en respuesta //
//       res.header('x-auth', token).send(user);
//     });
//   //   return user.generateAuthToken();
//   // }).then((token) => {
//   //   // Se crea la cabecera en la respuesta con el token //
//   //   // Se envía el user en respuesta //
//   //   res.header('x-auth', token).send(user);
//   }).catch((err) => {
//     res.status(400).send(err);
//   });
// });

// Con async await //
app.post('/users', async (req, res) => {
  try {
    // Como no cambiuan se pueden poner de tipo const //
    const body=_.pick(req.body, ['email', 'password']);
    const user=new User(body);
    await user.save();
    const token=user.generateAuthToken();
    res.header('x-auth', token).send(user);
  } catch(e) {
    res.status(400).send(e);
  }
});

// Esta función llama a una middleware (la función authenticate)
// que se ejecuta antes de ejecutarse la función //
app.get('/users/me', authenticate, (req, res) => {
  res.send(req.user);
});

// Esta función es para mostrar como se realiza este proceso.
// Es sustituida por las dos anteriores. la razón de separarlo es
// que la función de authenticate la vamos a reutilizar
// La funcion de authenticate esta en su propio fichero
// // Se usa para comprobar el token y, si no hay, o es invalido,
// solicitar autenticación //
// app.get('/users/me', (req, res) => {
//   var token=req.header('x-auth');
//   User.findByToken(token).then((user) => {
//     if(!user) {
//       // Se podría hacer esto
//       //res.status(401).send();
//       // Si hacemos esto es para que salte el catch de abajo
//       // ya que queremos devolver el mismo error
//       return Promise.reject('User not found');
//     }
//     res.send(user);
//   }).catch((err) => {
//     // 401 Authentication is required
//     res.status(401).send(err);
//   });
// });

// Autentica al usuario //
// app.post('/users/login', (req, res) => {
//   var body=_.pick(req.body, ['email', 'password']);
//   // Buscar el usuario por email
//   var email=body.email; // Si no hago esto, no coge el mail del body en findOne
//   User.findByCredentials(body.email, body.password).then((user) => {
//     // Se pone return para encadenar las Promesas y que si hay algún errores
//     // lo capture el catch de abajo //
//     return user.generateAuthToken().then((token) => {
//       // Se crea la cabecera en la respuesta con el token //
//       // Se envía el user en respuesta //
//       res.header('x-auth', token).send(user);
//     });
//   }).catch((err) => {
//     res.status(401).send(err); // Bad request
//   });
// });

// Con async await //
// Autentica al usuario //
app.post('/users/login', async (req, res) => {
  try {
    const body=_.pick(req.body, ['email', 'password']);
    // Buscar el usuario por email
    var email=body.email; // Si no hago esto, no coge el mail del body en findOne
    const user=await User.findByCredentials(body.email, body.password);
    const token=await user.generateAuthToken();
    res.header('x-auth', token).send(user);
  } catch(e) {
    res.status(401).send(err); // Bad request
  }
});

// Otar forma //
/*
app.post('/users/login', (req, res) => {
  var body=_.pick(req.body, ['email', 'password']);
  // Buscar el usuario por email
  var email=body.email; // Si no hago esto, no coge el mail del body en findOne
  User.findOne({email}).then((user) => {
    //throw 'oh, no!'; // Esto se captura con el catch de abajo
    if(!user) {
      res.status(401).send('User not found'); // Not authorized
    } else {
      // Comprobar que la pwd es correcta //
      // Compara la contraseña y el hash ///
      bcrypt.compare(body.password, user.password, (err, result) => {
        if(err) {
          res.status(401).send(err); // Not authorized
          //throw err;// Esto NO se captura con el catch de abajo
        }
        if(result) {
          // Si result es true entonces todo coinciden
          res.send(user);
        } else {
          // No coinciden
          //throw 'Passwords dont match!'; // Esto NO se captura con el catch de abajo
          res.status(401).send(err); // Not authorized
        }
      });
    }
  }).catch((err) => {
    console.log(err);
    res.status(401).send(err); // Not authorized
  });
});
*/

// Logout de usuario //
// Se llama al MW authenticate para comprobar si está autenticado //
// app.delete('/users/me/token', authenticate, (req, res) => {
//   // Se usa un instance method ya que viene relleno el user de llamar
//   // al middleware //
//   var token=req.header('x-auth');
//   req.user.removeToken(token).then((ret_user) => {
//     res.status(200).send();
//   }).catch((err) => {
//     res.status(400).send();
//   });
// });

// Con async await //
app.delete('/users/me/token', authenticate, async (req, res) => {
  // Se usa un instance method ya que viene relleno el user de llamar
  // al middleware //
  try {
    var token=req.header('x-auth');
    await req.user.removeToken(token);
    res.status(200).send();
  } catch(e) {
    res.status(400).send();
  }
});

// Arranca el servidor //
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

module.exports= {app};
