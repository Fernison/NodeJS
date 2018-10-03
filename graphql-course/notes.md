# GraphQL

  - GraphQL creates fast and flexible APIs, giving clients complete control to ask for just the data they need.
  - Fewer HTTP request. Flexible data querying. Less code to manage.
  - Esta sujeto a especificaciones que se encuentran en "facebook.github.io/graphql"

  Para hacer pruebas: "https://graphql-demo.mead.io/".

  Ejemplo de petición GraphQL:

    ```json
    query {
      post(id:"a5e8a241-d6e3-4446-94f8-fe36e8cabaf1") {
        title
      }
      users {
        name
        posts {
          id
          title
          comments {
            id
            text
          }
        }
      }
      hello
      courseInstructor
      course
    }
    ```

Los APIs GraphQL son self-documented ya que el API publicado expone un esquema.
En los esquemas, los tipos de datos (String, User, etc) se pueden mostrar con "!" al final. Eso indica que siempre se va a recibir al menos una respuesta de ese tipo (que podría estar vacía como en un array pero nunca null. *POR COFIRMAR*). Si no tiene exclamación, puede que no se reciba ninguno.

Hay 3 tipos de peticion GraphQL:
  - query
  - mutation
  - subscription

Cada vez que se consulte por un "objeto" (entidad o type en terminología GraphQL) hay que especificar al menos un atributo a consultar

## Babel

  - www.babeljs.io
  - Compilador de Javascript. Hace compatible el código de ES5 con clientes más antiguos.
  - Instalación: `npm install babel-cli@6.26.0 babel-preset-env@1.7.0`
  - Se configura en el fichero _.babelrc_ que se ubica en la raiz del proyecto:
  
  ```json
  {
    "presets": [
        "env"
    ]
  }
  ```
    Sólo se configura una preset ya que es la única que hemos instalado.

  - En "package.json" añadimos en "scripts" "start": "babel-node src/index.js" para que lo compile y ejecute babel
  - `npm run start` para ejecutarlo

## Yoga

  - https://github.com/prisma/graphql-yoga
  - Es la implementación de GraphQL en Node.
  - Instalación: `npm i graphql-yoga@1.14.10`
  - Es la librería más avanzada de GraphQL y la que más opciones incluye
  - Es fácil de configurar e instalar

## Nodemon

  -  Para iniciar automaticamente la palicación cuando haya cambios
  - `npm i nodemon@1.17.5 --save-dev`
  - En "package.json" cambiar "start" a "nodemon src/index.js --exec babel-node"

## Interesante

  - Commander (cmder.net). Emulador de terminal para Windows
  - Javascript sigue la especificación ECMAScript:
    - Chrome and Node siguen la V8 engine
    - Mozilla usa Spidermonkey
    - Microsoft usa Chikara
  - *lodash* es una libreria interesante para elmanejo de listas, arrays y objetos (`npm i lodash --save`)
  - // Models methods (como los estaticos de Java)
    // Ej: User.findByToken
    // Instance methods (los invocados con el objeto)
    // Ej: user.generateToken
  - *momentjs* es una librería para trabajar con fechas.





## Interesante

- Version actual (Dic 2017):
  - Javascript: ES7	
  - Node: 8.1.7 
- Es recomendable cuando se hace un *npm install...* poner la versión exacta.
- Usar JSON View plugin en Chrome para visualizar mejor los JSon
- Start Node up with *forever* so it restarts automatically if it crashes.
- *lodash* es una libreria interesante para elmanejo de listas, arrays y objetos (`npm i lodash --save`)
- // Models methods (como los estaticos de Java)
  // Ej: User.findByToken
  // Instance methods (los invocados con el objeto)
  // Ej: user.generateToken
- *momentjs* es una librería para trabajar con fechas.

## Debug Node

- Arrancar con `node --inspect xxx.js`
- Depurar por línea de comandos
- Depurar en Chrome: 
  - Arrancar con `node --inspect-brk xxx.js`
  - `chrome://inspect/#devices` en la barra de navegación de Chrome
  - En Chrome ir a *Open dedicated DevTools for Node*
  - Darle al *"play"*

## Setup SSH Keys para GitHub

- Se necesita un Git Bash ya que es lo que tiene acceso a las utilidades de creación de claves (+ info: google "github ssh keys")
- Desde la propia página de Git Hub se puede ver el proceso de creación y configuración de claves.
- Para ver el directorio de claves: `ls -al ~/.shh`
- Para generar la clave: `ssh-keygen -t rsa -b 4096 -C 'fernando.javadeveloper@gmail.com'`
- En las opciones seleccionar todo por defecto
- Se graba el direcotio de claves en el directorio por defecto del usuario
- Dentro del directorio de claves hay dos ficheros:
  - id_rsa: Clave privada que no hay que compartir con nadie.
  - id_rsa.pub: Clave  pública para compartir con otras aplicaciones
- Ejecutamos: `eval "$(ssh-agent -s)"`. Esto arranca el agente de SSH. Hay que tener cuidado con este proceso ya que si se arranca desde Git Bash,
  cuando se cierra la consola no se mata el proceso y no se puede volver a arrancar un Git Bash. O se hace desde una consola MS-DOS o se mata desde el Admin de tareas.
  Este comando ademas devuelve el PID.
- Ejecutar: `ssh-add ~/.shh/id_rsa`. Para decirle al agente donde esta la clave que acabamos de añadir. Así la utilizara cuando se intere conectar con otros sistemas usando la clave.
- Una vez creada la cuenta de GitHub hay que añadir la clave. Para ello:
  - En GitHub/settings/SSH and GPG Keys añadir la clave.
  - Hay que copiar el contenido de la clave publica.
  - La clave empieza por ssh-rsa y termina por el email.
  - Credenciales: *fernando.javadeveloper@gmail.com/J0rg32506*
- Una vez añadida la clave en GitHub, se testea la conexión. Para ello se ejecuta: `ssh -T git@github.com`
  - Hay que buscar el msg: *"You've successfully authenticated"*

## Añadir a GitHub el proyecto creado

- Se crea un repositorio en GitHub
- Para añadir un proyecto ya creado:
  - `git remote add origin https://github.com/Fernison/node-course-2-web-server.git` (añade el repositorio remoto a nuestro Git local)
  - `git push -u origin master`  (se sube al repositorio remoto)
- `git diff` muestra las diferencias enrte los ficheros locales modificados y los remotos subidos.

## Despliegue en Heroku

- https://dashboard.heroku.com/apps
- Credenciales: *fernando.javadeveloper@gmail.com/J0rg32506*
- Es necesario instalar *"heroku toolbelt"* de *"toolbelt.heroku.com (redirige a  https://devcenter.heroku.com/articles/heroku-cli)"*
- En esa página se baja la versión del SO correpondiente.
- En una consola ejecutar: `heroku --help` para ver la ayuda.
- Si estamos en Windows, en una consola de MS-DOS ya que con una que simula Linux (git bash, cygwin, etc) no funcionará, ejecutar: `heroku login` y logarse con las credenciales dela cuenta de Heroku. Tiene que aparecer un mensaje tipo: *"logged as email"*
- Ejecutar: `heroku keys:add` para añadir la clave pública a Heroku. - Si se quiere eliminar la clave, ejecutar: `heroku keys_remove [email de la cuenta de Heroku]`
- Tiene que aparecer el mensaje *"Authentication succeded"*
- Ejecutar: `heroku create` dentro del directorio de la aplicación que queremos desplegar:
  - Se crea una nueva aplicación en el repositorio remoto de Heroku.
  - Se crea un nuevo repositorio remoto ennuestro Git local
- Ejecutar: `git push heroku` para subir el código al repositorio remoto de Heroku. El único branch que Heroku maneja es *master*.
- Este comando geenra muchas trazas. Tienen que aparecer mensajes de éxito y al final tiene que aparecer una URL, por ejemplo: https://arcane-falls-66145.herokuapp.com/
- También se puede abrir directamente desde consola ejecutando `heroku open`
- Con `heroku logs`se ven los logs.
- Para ver las variables de entorno en heroku: `heroku config`
- Para crear variables de entorno de heroku:  `heroku config:set NAME=VALUE`. Para eliminar la variable de entorno: `heroku config:unset NAME`
- Para obtener el valor de una variable de entorno de Heroku: `heroku config:get NAME`
- En la aplicación *node-todo-api* añadimos nuestras variables manualmente:
  - `heroku config:set MONGODB_URI=mongodb://node:secreta@ds135916.mlab.com:35916/todoapp`
  - `heroku config:set JWT_SECRET=secreta`


### Cambios en package.json

- Hay que hacer unos cambios en package.json para que funcione el despliegue de y ejecución en Heroku:

```Javascript
  ...
  "scripts": {
    ...,
    "start": "node server/server.js"
  },
  "engines": {
    "node":"8.1.4" 
  },
  ...
```
- *engines* indica la versión de Node a utilizar en Heroku	

### Configurar uan BD en real

- Se usa el addon de Heroku, *mLab*, aunque pide tarjeta de credito. Para evitarlo ir a https://mlab.com/signup/ y crear una cuenta. Da acceso a un BBDD publica y gratis.
- Si se hace desde Heroku, ejecutar en la consola: `heroku addons:create mongolab:sandbox`.
- Si se ejecuta correctamente, con `heroku config' se ve la variable de entorno *MONGODB_URI*

## Testing

- Se usa Mocha (https://mochajs.org) como FW para ejecutar pruebas (como JUnit)
- Para instalarlo: `npm install mocha --save-dev`. Notar lo de `-dev`para que lo instale solo para desarrollo
- Para que Mocha ejecute los test se deben crear los ficheros de test con la extensión *test.js*
- Para ver ficheros de pruebas ver *utils.test.js*
- Además, para que Mocha se ejecute hay que cambiar en *package.json* lo siguiente:

```javascript
	"scripts": {
    	"test": "mocha **/*.tests.js"
	},
```

	- Se ejecutan todos los ficheros con extensión *.tests.js*
- Para ejecutarlo: `npm test`. Los que se ejecuten bien tienen un tick

### Ejecución automática

- Para reejecutar los test cada vez que cambia el código ejecutar `nodemon --exec "npm test"` (ojo con las comillas en funcion del SO)
- Se puede hacer un custom script para ejecutarlo. Para ello  hay que cambiar lo siguiente en *package.json*:

```javascript
	"scripts": {
    	"test": "mocha **/*.tests.js",
    	"test-watch": "nodemon --exec \"npm test\""
	},
```
- Para ejecutarlo, `npm run test-watch`

### Assertion

- Usaremos *Expect* (https://github.com/mjackson/expect)
- Para instalar: `npm install expect@1.20.2 --save-dev` (no es la última versión)

### Pruebas con Express

- Se usa *supertest* (https://github.com/visionmedia/supertest)
- Para ver ficheros de pruebas ver *./server/server..test.js*

### Describe

- Agrupar pruebas
- Para ver ficheros de pruebas ver *utils.test.js*

### Test Spies

- Es como *mock*
- Se necesita utilizar *rewire*, que mockea los objetos
- Para ver ficheros de pruebas ver */spies/app.test.js*

### Ver Jest

- Jest está más orientado a probar la capa cliente.
- El paquete *expect* de Jest es la última versión de *expect*.

### Poblar con datos las pruebas

- Crear un fichero independiente en *seed/seed.js*.
- Este fichero contiene las precargas de datos.

## Acceso a datos

- Usamos MongoDB
- Parra arancar la BBDD en Windows (no usar Git Bash) ejecutar `[Directorio_Mongo]\MongoDB\Server\3.6\bin\mongod.exe --dbpath d:\Desarrollo\MongoDB\Server\mongo-data`
- Si todo va bien, se muestr ale mensaje *waiting for connections on port 27017*
- Para conectarse a una BBDD, ejecutar `[Directorio_Mongo]\MongoDB\Server\3.6\bin\mongo.exe`
- Se conecta a la BBDD por defecto en 127.0.0.1:27017
- Con Mongo no hace falta crear la BBDD antes de conectarse a ella. Si no está creada, la crea la primera vez. Realmente, la crea completamente cuando se añaden datos por primera vez. Por eso, si se crea y no se ha rellenado nada, no se ve en la lista de BBDD de Robo 3T.
- Para crear una colección, en este caso de *Todos*, ejecutar, una vez conectado: `db.Todos.insert({text: 'Create new Node course'})`. Lo que se inserta, en este caso, es un objeto conla propiedad *text*. Se debe obtener como respuesta: *WriteResult({ "nInserted" : 1 })*
- Para obtener todos los registros de Todos , ejecutar `db.Todos.find()`. Se obtiene: *{ "_id" : ObjectId("5a2f9ee4c0324ffa45d31b12"), "text" : "Create new Node course" }*. *_id* es el ID único que Mongo pone a cada registro.
- Para visualizar graficamente una BBDD se puede usar *Robomongo* (robomongo.org. Ahora se llama *Robo 3T*). Por defecto, la instalación de Mongo incluye *MongoDB Compass Community*.
- El *mongoose middleware* permite realizar acciones antes o después de que se poduzcan eventos (p.ej: actualización de datos).

### SQL vs NoSQL Vocabulario

- Database existe en las dos y tiene el mismo significado.
- En SQL hay "Tablas" y en NoSQL, "Colecciones" en formato JSON
- En SQL los registros de las tablas son "Filas o Registros" y en NoSQL son "Documentos"
- SQL está basado en esquemas.
- En SQL los registros se dividen en "Columnas" y todos los registros de una misma tabla tienen las mismas columnas. En NoSQL tienen "Fields" (Campos o Propiedades).
- En NoSQL, los Documentos de una misma Colección no tienen porque tener las mismas propiedades. Pueden tener distintas propiedades.

### Integrar MongoDB en Node

- Podemos conectarnos con el driver nativo usando *node-mongodb-native* https://github.com/mongodb/node-mongodb-native (Ver API. En los ejemplos se ha usado la V 2.2)
- Información del ID unico de Mongo. Por ejemplo: *5a2fac490bb5534f2c5faefd*:
  - 4 bytes de timestamp. No hace falta tener una propiedad de fecha de creación. Ya la tiene el ID.
  - 3 bytes de identificador de máquina. 
  - 2 bytes de Process Id
  - 3 bytes de valor aleatorio
- Aunque no se indique el * _id*, Mongo lo pone por defecto al crear un documento. Podemos ponerlo nosotros también y asñi crear id customizados.
- Para actualizaciones ver https://docs.mongodb.com/v3.4/reference/operator/update/

### Mongoose

- Ver http://mongoosejs.com/
- Cuidado con Mongoose, porque castea automaticamente objetos y puede dar lugar a errores por problemas con los tipos.

## Construir un Backend REST

### Estructura de proyecto:

- En server/server.js sólo queremos los manejadores de las rutas (route handlers).
- Creamos una carpeta server/db donde incluir todos los ficheros para inicializar Mongoose.
  - Creamos un fichero llamado mongoose.js donde inicializamos Mongoose.
- Creamos una carpeta server/models donde incluir todos los Models. 
  - Creamos un fichero para cada model.

### Paquetes necesarios

- `npm i express body-parser --save`
- *body-parser* sirve para parsear el body principalmente en formato JSON.

### Server.js

- En este fichero se meten las rutas (routes).

### Probar los endpoints

- Instalar Mocha, Expect, Supertest y Nodemon.
- `npm install i expect mocha nodemon supertest --save-dev`

## Postman

- Se pueden crear *environments*.
- En cada environment se pueden añadir variables. En este caso añadimos la variable *url* con el valor del entorno en local o heroku.
- En cada URL de Postman se indica la URL configurable: http://*{{url}}*/todos/5a323841ca2d3f187625f619

### Para reutilizar variables en distintas llamadas

- Ir a la llamada donde se rellene el valor de la variable que queremos reutilizar.
- En la pestaña *test* escribir, para obtener un valor de la cabecera HTTP:: 
  - `var token=postman.getResponseHeader('x-auth');`
  - `postman.setEnvironmentVariable('x-auth', token); `
- En la pestaña *test* escribir, para obtener un valor de la respuesta:: 
  - `var token=postman.getResponseHeader('x-auth');`
  - `postman.setEnvironmentVariable('x-auth', token); `
- Para usarlas en el resto de llamadas, poner lo siguiente: `{{nombre_variable}}` (en este caso, `{{x-auth}}`)



## Configuración de entorno

- Por ejemplo, para que no afecte a nuestra BBDD "real".
- Tenemos que establecer variables de entorno.
- La variable de entorno *NODE_ENV* está ya adoptada por muchos could providers. Por defecto, en Heroku su valor es "*production*".
- En *package.json* se pueden establecer los entonos por defecto que se ejecutará en cad Script. Por ejemplo:
```javascript
"scripts": {
"start": "node server/server.js",
"test": "export NODE_ENV=test || SET \"NODE_ENV=test\" && mocha server/**/*.test.js",
"test-watch": "nodemon --exec \"npm test\""
},
```

- Es recomendable incluir toda la configuración en un fichero en *config/config.js*.

## Seguridad

- Se usará estemodelo de usuario:
```JSON
  {
    email: sss@ddd.es, // Login
    password: 'pwd_hash', // Contraseña encriptada
    tokens: [{ // Array de tokens
      access: 'auth', // Tipo de token
      token: 'hash_string' // Lo que se envía en las peticiones //
    }]
  }
```
- Para las validaciones, usar los *Mongoose validators*. Está en el paquete Validator (*npm validator*)
- LIbrería de encriptación: *crypto-js*. Para instalar: `npm install crypto-js --save`
- Usamos JWT para generar los token: `npm i jsonwebtoken`
- Para hashear las pwd usaremos el algoritmo *bcrypt*. Instalaremos la siguiente librería: `npm i bcryptjs --save`. (es la mas recomendable)

## Configuración externa

- Almacenamos la configuración en un json

## Async/Await

- A partir de ES7
- Es una mejora de las promesas.
- Uno de los problemas de las promesas es cuando se encadenan promesas y al final se quiere hacer algun tipo de cálculo con información recibida de las promsesa encadenadas, pero no se tiene información de los resultados obtenidos en las primeras promesas. No se progresasn entre las promesas encadenadas.
- Sólo se puede usar await dentro de una función async