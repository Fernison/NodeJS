import jwt from 'jsonwebtoken'

// Generar auth token
// JSON Web Token (JWT)
// Primer parametro, el payload. Se puede poner lo que se quiera
// Segundo parámetro, el secret        
const token=jwt.sign({
    id: 46,
}, 'secret')
console.log(token)
const decoded=jwt.decode(token)
console.log(decoded)

// Verifica que el token se creo con el secret. Si falla lanza una Excepcion. SI no, devuelve el payload
console.log(jwt.verify(token, 'secret'))