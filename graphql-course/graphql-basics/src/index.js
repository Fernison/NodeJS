import { GraphQLServer } from 'graphql-yoga'

// Type definitions (schema, entidades, etc..)
// Scalar (single attribute type) types - String, Boolean, Int, Float, ID
// En el ejemplo inferior, Query, User, etc son types
// Query siempre se tiene que llamar así y que en él se encuentren los types que queremos consultar
// Arguments: greeting(name: String). Se le pasa la lista de parámetros separados por ","" indicando el nombre y el tipo
// Se invoca así:
/* query {
    greeting(name: "Heinz")
    ...
  }
 */  
const typeDefs = `
    type Query {
        greeting(name: String, position: String): String!
        me: User!
        post: Post!
        add(a: Int, b: Int): Int!
    }

    type User {
        id: ID!
        name: String!
        email: String!
        age: Int
    }

    type Post {
        id: ID!
        title: String!
        body: String!
        published: Boolean!
    }

`

// Resolvers for API (funciones que saben qué ejecutar cuando se ejecuta una petición GraphQL)
// A cada método de los resolvers se le pasan los siguientes parámetros:
/*
                    "parent"
                    "args". Contiene los argumentos que se pasan
                    "ctx". Context (si esta logado, etc)
                    "info". Contiene información de la petición
*/
const resolvers = {
    Query: {
        greeting(parent, args, ctx, info) {
            console.log(args)
            if(args.name) { // name es el parámetro que se le pasa a greeting
                return `Hello ${args.name}, ${args.position}`
            }
            return 'Hello default'
        },
        me() {
            return {
                id: '12345678ABC',
                name: 'Fernison',
                email: 'heinz@dot.com'
            }
        },
        post() {
            return {
                id: '12345678ABC',
                title: 'titulo',
                body: 'Este es el cuerpo',
                published: true
            }
        },
        add(parent, args, ctx, info) {
            console.log(args)
            if(args.a && args.b) {
                return args.a+args.b
            }
            return 0
        }
    }
}

const server = new GraphQLServer({
    typeDefs,
    resolvers
})

// Por defecto, Yoga arranca en el puerto 4000
server.start(() => {
    console.log('The server is UP!!!')
})