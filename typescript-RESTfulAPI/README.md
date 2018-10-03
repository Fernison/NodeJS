# Ejemplo de REST API usando Typescript, Express y MongoDB

  - Se sigue este tutorial: "https://itnext.io/building-restful-web-apis-with-node-js-express-mongodb-and-typescript-part-5-a80e5a7f03db"


## Arrancar MongoDB ##

  - `docker run --name some-mongo --rm -v data_mongo:/data/db -p 27017:27017 mongo`
  - Para visualizar la BBDD se usa *Robo 3T*.

## Seguridad

### Crear un certificado

  -  Se usa *OpenSSL*.
  - Ejecutar `c:\Program Files\OpenSSL-Win64\bin\openssl.exe` como Administrador. En Powershell, por ejemplo.
  - Ejecutar `rsa -in keytemp.pem -out key.pem`
  - El resultado son 3 ficheros:
    - cert.pem. Clave utilizada para generar la clave.
    - keytemp.key. Clave temporal.
    - key.temp. Clave RSA creada a partir de la clave temporal.
  - Copiar cert.pem y key.pem al proyecto para que se referencia a la hora de crear el servidor https.
