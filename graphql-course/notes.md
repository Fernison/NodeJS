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



