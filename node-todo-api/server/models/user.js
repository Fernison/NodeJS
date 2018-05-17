const mongoose=require('mongoose');
const validator=require('validator');
const jwt=require('jsonwebtoken');
const _=require('lodash');
const bcrypt = require('bcryptjs');

/*
{
  email: sss@ddd.es,
  password: 'pwd_hash',
  tokens: [{
    access: 'auth',
    token: 'hash_string' // Lo que se envía en las peticiones //
  }]
}
*/

// Crea un schema //
// En este caso el del usuario //
var UserSchema=new mongoose.Schema({
  email: {
    type: String,
    // Las valildaciones son: http://mongoosejs.com/docs/validation.html //
    required: true,
    minlength: 1,
    match: /.@/, // Comprueba que tenga una @.
                 // Ver (http://mongoosejs.com/docs/api.html#schema_string_SchemaString-match)
                 // Ver (https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp)
    trim: true, // Quita los espacios en blanco delante y detras //
    unique: true,
    validate: {
      validator: (value) => {
        return validator.isEmail(value);
      },
      // Tambien se puede hacer sin usar una funcion completa //
      //validator: validator.isEmail,
      message: '{VALUE} is not a valid email'
    }
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  tokens: [{
    access: {
      type: String,
      required: true
    },
    token: {
      type: String,
      required: true
    }
  }]
});

// Mongoose middleware. Se ejecuta siempre antes de hacer save //
UserSchema.pre('save', function(next) {
  user=this;
  // Se comprueba si la password es actualizada para hashearla //
  // Si no ha sido actualizada no hay que hashearla otra vez //
  if(user.isModified('password')) {
    //  Se hashea la pwd //
    bcrypt.genSalt(10,(err, salt) => {
      bcrypt.hash(user.password, salt, (err, hash) => {
        user.password=hash;
        next();
      });
    });
  } else {
    // No se hashea //
    next();
  }
});

// Sobrescribimos un metodo de Mongoose //
// Lo hjacemos para que el objeto que devuelve mongoose solo tenga
// los valores que queremos y no todos los atributos //
UserSchema.methods.toJSON = function () {
  var user=this;
  var userObject=user.toObject(); // user lo convierte en un objeto
  // Se devuelve solo el _id y el mail //
  var user=_.pick(userObject, ['_id', 'email']);
  return user; // Si lo ponemos entre {} devuelve:
  /*
    {
        "user": {
            "_id": "5a33b9fe384f496489bf9ca4",
            "email": "email_test4@gmail.com"
        }
    }
    Si no, devuelve:
    {
        "_id": "5a33b9fe384f496489bf9ca4",
        "email": "email_test4@gmail.com"
    }
  */
};

// Creamos un instance method //
// creamos una function en lugar de una arrow function ya que Las
// arrow functions no tienen acceso a this //
UserSchema.methods.generateAuthToken = function () {
  // Con minúsculas ya que es un Instance method //
  var user=this;
  var access='auth';
  var token=jwt.sign({_id: user._id.toHexString(), access}, process.env.JWT_SECRET).toString();

  // Al array tokens de user se le pasa el valor de access y token que
  // se acaba de crear //
  //user.tokens.push({access, token}); // Esto no funciona en v 3.X de MongoDb
  // Esto sí funciona //
  // Vaciar el array //
  user.tokens.length = 0;
  user.tokens=user.tokens.concat({access, token}); //this uses $set so no problems

  // Se devuelve con return para que devuelva otra Promesas
  // De esa forma, cuando se recupera el resultado se puede volver
  // a invocar a then()
  return user.save().then(() => {
    return token;
  });
};

// Borra el token //
UserSchema.methods.removeToken = function (token) {
  // Con minúsculas ya que es un Instance method //
  var user=this;
  return user.update({
    // $pull elimina los elementos que coincidan con la busqueda
    // en este caso elimina el token enviado como parametro
    // del array de token
    $pull: {
      tokens: {
        token: token
      }
    }
  });
};

// Creamos un Model method //
// Para encontrar el usuario en función del token //
UserSchema.statics.findByToken = function (token) {
  // Con mayusculas ya que es un Model method //
  var User=this;
  var decoded;
  try {
    decoded=jwt.verify(token, process.env.JWT_SECRET);
  } catch(e) {
    // Se devuelve una promesa con Reject ya que ha habido un error //
    return new Promise((resolve, reject) => {
      reject('Invalid token')
    });
    // También se puede hacer esto que es igual a lo anterior //
    //return Promise.reject('Invalid token')
  }
  // Al devolver un return, devolvemos una promesa que se puede encadenar
  // con otra promesa desde donde se llama a este metodo //
  return User.findOne({
    _id: decoded._id, // El _id es el obtenido de descodificar el token
    'tokens.token': token, // El token es almacenado en tokens.token
    'tokens.access': 'auth' // Access es 'auth'
  });
};

// Creamos un Model method //
// Para encontrar el usuario en función del mail y la pwd //
UserSchema.statics.findByCredentials = function (email, password) {
  // Con mayusculas ya que es un Model method //
  var User=this;
  // Al devolver un return, devolvemos una promesa que se puede encadenar
  // con otra promesa desde donde se llama a este metodo //
  return User.findOne({email}).then((user) => {
    if(!user) {
      return Promise.reject(); // Lo capturaría el catch del que llama a esta Promesa
    }
    // Creamos una Promesa ya que bcrypt es una callback y no una Promesas
    // Por eso nos hacemos nuestra nueva promesaas //
    return new Promise((resolve, reject) => {
      // Comprobar que la pwd es correcta //
      // Compara la contraseña y el hash ///
      bcrypt.compare(password, user.password, (err, result) => {
        if(err) {
          reject();
        }
        if(result) {
          // Si result es true entonces todo coinciden
          resolve(user);
        } else {
          // No coinciden
          reject('Pwd incorrect');
        }
      });
    })
  }); // No le pongo el catch ya que el error lo lanza el propio findOne
};

var User=mongoose.model('User', UserSchema);

module.exports = {User};
