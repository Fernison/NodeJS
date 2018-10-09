import { GraphQLServer } from 'graphql-yoga'
import db from './db'
import Query from './resolvers/Query'
import Mutation from './resolvers/Mutation'
import Post from './resolvers/Post'
import User from './resolvers/User'
import Comment from './resolvers/Comment'

const server = new GraphQLServer({
    typeDefs: './src/schema.graphql', // Se indica la ruta del fichero con el esquema
    resolvers: { // Los objetos con los resolvers
        Query,
        Mutation,
        Post,
        User,
        Comment
    },
    context: { // Define los atributos del contexto
        db // Cada uno de los resolvers recibe el context y sus atributos. Aqui se pasa la conexión a BBDD
    }
})

// Por defecto, Yoga arranca en el puerto 4000
server.start(() => {
    console.log('The server is UP!!!')
})