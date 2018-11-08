import { GraphQLServer, PubSub } from 'graphql-yoga'
import db from './db'
import Query from './resolvers/Query'
import Mutation from './resolvers/Mutation'
import Subscription from './resolvers/Subscription'
import Post from './resolvers/Post'
import User from './resolvers/User'
import Comment from './resolvers/Comment'
import prisma from './prisma' // Se puede poner así ya que no se importa ningún atributo

const pubsub = new PubSub()

const server = new GraphQLServer({
    typeDefs: './src/schema.graphql', // Se indica la ruta del fichero con el esquema. 
                                      // Es distinto al de Prisma ya que este se usa para la comunicacion cliente-backend
                                      // y el de Prisma se usa para la comunicación backend-prisma
    resolvers: { // Los objetos con los resolvers
        Query,
        Mutation,
        Subscription,
        Post,
        User,
        Comment
    },
    context(request) { // Define los atributos del contexto. Se pasa lo que se vaya a usar en los Resolvers
        // En request.request.headers estan todas las cabeceras
        return {
            db, // Cada uno de los resolvers recibe el context y sus atributos. Aqui se pasa la conexión a BBDD
            pubsub, // En el contexto se envía el objeto encargado de las suscripciones
            prisma,
            request // Info de la request
        }
    }
})

// Por defecto, Yoga arranca en el puerto 4000
server.start(() => {
    console.log('The server is UP!!!')
})