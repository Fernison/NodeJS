var {User}=require('./../models/user');

// Comprueba que el token existe en la BBDD //
// Tambien se puede hacer así y comentando la ultima línea //
//module.exports.authenticate = (req, res, next) => {
var authenticate = (req, res, next) => {
  var token=req.header('x-auth');
  User.findByToken(token).then((user) => {
    if(!user) {
      // Se podría hacer esto
      //res.status(401).send();
      // Si hacemos esto es para que salte el catch de abajo
      // ya que queremos devolver el mismo error
      return Promise.reject('User not found');
    }
    // En la request, le inlcuimos el objeto user que acabamos de recuperar
    // y el token que venía en la cabecera. De esta forma, el resto de endpoints
    // tienen el token en la request
    req.user=user;
    req.token=token;
    next();
  }).catch((err) => {
    // 401 Authentication is required
    res.status(401).send(err);
  });
};

var ejemplo_mw = (req, res, next) => {
  next();
};

module.exports={authenticate, ejemplo_mw};
