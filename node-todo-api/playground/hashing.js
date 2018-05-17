// SHA-256
const {SHA256}=require('crypto-js');
const jwt=require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// En este principio se basa JWT //
// Prueba con crypto-js
// var message='I am user number 3';
// var hash=SHA256(message).toString();
//
// console.log(`Message: \"${message}\". Hash: ${hash}`);
// var data = {
//   id: 4
// };
//
// var token= {
//   data,
//   // Se hace hash de data en JSON + 'secret'
//   hash: SHA256(JSON.stringify(data)+'secret').toString()
// };
//
// var resultHash=SHA256(JSON.stringify(token.data)+'secret').toString();
//
//
// if(resultHash===token.hash) {
//   console.log('Coinciden');
// } else {
//   console.log('No coinciden');
// }

// Prueba con jsonwebtoken //
// jsonwebtoken Tiene dos metodos
//sign crea el token
//verify lo verifica
// var data = {
//   id: 10
// };
//
// var token=jwt.sign(data, 'secret');
// console.log(token);
// var result=jwt.verify(token, 'secret');
// console.log(result);

// Prueba con bcrypt //
var password='secreta';
var hashedPassword='$2a$10$zeOchTyuLAYFqcfK3Faqj.fGBh0mRXnd0TNF6gd0wtq/fyRL9AZ9a';

// 1º se hace el Salt de la pwd.
// Salt genera muchos caracteres aleatorios que luego se le añaden
// a la pwd de forma que no se pueda predecir
// El primer parametro de genSalt es el numero de veces que se aplica el algoritmo.
// Cuanto mayor, mas seguro pero más lenta la generación
// bcrypt.genSalt(10,(err, salt) => {
//   // 2ª se hashea
//   bcrypt.hash(password, salt, (err, hash) => {
//     console.log(hash);
//     hashedPassword=hash;
//   });
// });


// Compara la contraseña y el hash ///
bcrypt.compare(password, hashedPassword, (err, result) => {
  if(result) {
    // Si result es true entonces todo coinciden
    console.log('Coinciden');
  } else {
    // No coinciden
    console.log('NO Coinciden');
  }
});
