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

### Mutation

  - Manipula los datos (CUD)

### Subscription

  - Notifica los cambios en los datos.
  - Usa Web Sockets
  - Yoga usa por debajo la librería 'graphql-subscriptions':
    - Pub: publish
    - Sub: Subscribe

### Enums

  - Como las enumeraciones de Java
    - 'UserRole - standard, editor, admin'

  ```json
    type User {
      role: UserRole! // El valor tiene que ser uno de los de la enumeración
    }
  ```

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

## Babel - Transform Object Rest Spread

  - Es un plugin. Copia facilmente propiedades de un objeto a otro
  - Instalación: `npm install babel-plugin-transform-object-rest-spread@6.26.0`
  - Despues de instalarlo, podemos añadir "plugins" en el fichero ".babelrc"
  
  ```json
  {
      "presets": [
          "env"
      ],
      "plugins": [
          "transform-object-rest-spread"
      ]
  }
  ``` 

  - Ejemplo:

  ```javascript
    const object_one= {
      name: 'Heinz',
      age: 45
    }

    const object_two= {
      population: 123456798,
      ...object_one // Copia las propiedades de one a two sin necesidad de copy-paste
    }
  ```

## Prisma

  - https://www.prisma.io/
  - Como un ORM preparado para GraphQL.
  - *ES UN SERVIDOR A PARTE. NO ES UN ORM INTEGRADO EN EL PROYECTO.*
  - Database agnostic (SQL y NoSQL) Actualmente: MySQL, PostGress, MongoDB
  - Instalación en Windows:
    - Instalar PostGres (la db seleccionada):
      - Ir a Heroku: www.heroku.com y logarse (fernando.javadeveloper/J0rg32506) y crear una app y añadirle el plugin "Heroku Postgres".
      - Instalar PGAdmin
    - Docker para ejecutar un contenedor.
  - Instalar el modulo NPM CLI de Prisma: `npm i -g prisma@1.12.0`
  - Para crear un proyecto Prisma: `prisma init prisma`
    - Responder a las preguntas. El nombre del esquema es: "schema.graphql"
  - Al finalizar se crean 3 ficheros:    
    - 'prisma.yml'           Prisma service definition
    - 'datamodel.graphql'    GraphQL SDL-based datamodel (foundation for database). Contiene los Type Definitions. Se usa para crear la BBDD
    - 'docker-compose.yml'   Docker configuration file
      - Borramos 'schema: schema.graphql' y añadimos 'ssl: true' para que funcione con Heroku que es SSL
  - Para arrancar Prisma:
    - `prisma/docker-compose up -d`
    - `prisma deploy` Se debe ejedockercutar cada vez que se hagan cambios en Prisma
  - Para ver el GraphQL Playground: http://localhost:4466
  - Por defecto, Prisma crea un esquema que contiene las operaciones (query, mutation, subscription) por defecto de CRUD.
  - Para crear un usuario de prueba:
  
    ```json
    mutation {
      createUser(
        data: {
          name: "Heinz"
        }
      ) {
        id    
        name
      }
    }
    ```
  - Cuando se modifica el esquema y se añade/modifica algún atributo obligatorio, si en la BBDD que se modifica no existe ese campo con algún valor da un error:
    `User
    × You are creating a required field but there are already nodes present that would violate that constraint.`
    Esto tiene un problema con los datos ya existentes si estamos en BBDD de producción.
  - '@unique' es una directiva de GraphQL. Indica que el campo es único. Para usarlas se pone "@" y la directiva. @unique es obligatorio en atributos de tipo ID
  - Cuando hay relaciones entre tipos, Prisma crea tablas nuevas para representar esas relaciones, por ejemplo: _PostToUser
  - Para crear un Post de un User existente:

  ```json
  mutation {
    createPost(
      data: {
        title: "Post con Prisma2"
        body: "Body Prisma2"
        published: false
        author: {
          connect: {
            id: "cjnd7vhnd000g0789nytaiddc"
          }
        }
      })
    {
      id
      title
      body
      published
      author {
        name
      }
    }
  }
  ```

### Integración Prisma con NodeJs

  - 'prisma-binding'. Instalar: `npm i prisma-binding@2.1.1`
  - 'graphql-cli'. Utilidades. Sirve, por ejemplo. migra un esquema a otro. Instalar: `npm i graphql-cli@2.16.4`
    - '.graphqlconfig'. Para configurarlo:
    ```json
    {
      "projects": {
          "prisma": { // Nombre del proyecto. Se puede poner lo que se quiera
              "schemaPath": "./src/generated/prisma.graphql", // La ruta donde se almacenará el esquema al que se ha migrado
              "extensions": {
                  "endpoints": {
                      "default": "http://localhost:4466" // La URL de Prisma
                  }    
              }            
          }
      }
    }
    ```
    - En 'package.json' se añade en "scripts": `"get-schema": "graphql get-schema -p prisma"` para que se genere el esquema. 
    - El esquema se genera a partir del esquema situado en: './[prisma]/datamodel.graphql'
    - Se ejecuta con `npm run get-schema`. El fichero que se crea no se debe tocar manualmente. Sólo cuando regeneramos el esquema


### Relaciones entre tipos

  - Para poder borrar elementos que tengan dependencias con otros (típico error de base de datos)
  - Se puede jugar con los nulls, haciendo que los campos necesarios sean nullables o con Cascades
  - Para ello se usa la directiva de Prisma: '@relation'. 
    - Usage: `@relation(name: "[NOMBRE_DESCRIPTIVO (por ejemplo, el nombre de la relación)]", onDelete: [SET_NULL (por defecto)|CASCADE])`
  - Una vez modificado el esquema hay que volver a desplegarlo


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
  - Es útil para escritura y borrado?
  - *uuid* para generar IDs:
    - `npm install uuid@3.3.2`



