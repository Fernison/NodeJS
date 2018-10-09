import { GraphQLServer } from 'graphql-yoga'
import uuidv4 from 'uuid/v4'
import { truncate } from 'fs';

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
// grades: [Int!]!. Se puede poner la exclamación tanto al array como a cada elemento del array
const typeDefs = `
    type Query {
        greeting(name: String, position: String): String!
        add(numbers: [Float!]!): Float!
        grades: [Int!]!
        me: User!
        post: Post!
        users(query: String): [User!]!
        posts(query: String): [Post!]!
        comments: [Comment!]!
    }

    type Mutation {
        createUser(name: String!, email: String, age: Int): User!
        createPost(title: String!, body: String!, published: Boolean!, author: String!): Post!
        createComment(text: String!, author: String!, post: String!): Comment!
    }

    type User {
        id: ID!
        name: String!
        email: String!
        age: Int
        posts: [Post!]!
        comments: [Comment]
    }

    type Post {
        id: ID!
        title: String!
        body: String!
        published: Boolean!
        author: User!
        comments: [Comment]
    }

    type Comment {
        id: ID!
        text: String!
        author: User!
        post: Post!
    }
`

const users=[
    {
        id: '11',
        name: 'Heinz',
        email: 'heinz@dot.com'
    },
    {
        id: '22',
        name: 'clander',
        email: 'clander@dot.com'
    },
    {
        id: '33',
        name: 'clanderrrr',
        email: 'muander@dot.com',
        age: 34
    }  
]

const posts=[
    {
        id: '1',
        title: 'titulo1',
        body: 'Este es el cuerpo1',
        published: true,
        author: '11' // Se pone el id del usuario
    },
    {
        id: '2',
        title: 'titulo12',
        body: 'Este es el cuerpo2',
        published: true,
        author: '22' // Se pone el id del usuario
    },
    {
        id: '3',
        title: 'titulo3',
        body: 'Este es el cuerpo23',
        published: false,
        author: '33' // Se pone el id del usuario
    }
]

const comments=[
    {
        id: '1',
        text: 'comment 1',
        author: '11',
        post: '1'
    },
    {
        id: '2',
        text: 'comment 2',
        author: '11',
        post: '1'
    },
    {
        id: '3',
        text: 'comment 3',
        author: '33',
        post: '3'
    },
    {
        id: '4',
        text: 'comment 4',
        author: '33',
        post: '3'
    }
]

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
            if(args.name) { // name es el parámetro que se le pasa a greeting
                return `Hello ${args.name}, ${args.position}`
            }
            return 'Hello default'
        },
        add(parent, args, ctx, info) {
            if(args.numbers.length === 0) {
                return 0
            } else {
                return args.numbers.reduce((accumulator, currentValue) => { // Suma los números
                    return accumulator+currentValue
                })
            } 
        },
        grades(parent, args, ctx, info) {
            return [99, 45, 36, 23]
        },
        me() { // Se puede declarar el método sin todos los parámetros: parent, args, ctx, info) {
            return {
                id: '12345678ABC',
                name: 'Fernison',
                email: 'heinz@dot.com'
            }
        },
        post(parent, args, ctx, info) {
            return {
                id: '12345678ABC',
                title: 'titulo',
                body: 'Este es el cuerpo',
                published: true
            }
        },
        users(parent, args, ctx, info) {
            if(!args.query) {
                return users                
            }
            return users.filter(user => { // "filter" busca los que cumplan la condición
                // Se comprueba si el array contiene el parametros que se pasa //
                // Se mira el nombre. Para ello se coge el nombre, se pone en minuscula y se compara con el parámetro pasado en minuscula //
                return user.name.toLowerCase().includes(args.query.toLowerCase())
            })
        },
        posts(parent, args, ctx, info) {
            if(!args.query) {
                return posts                
            }
            return posts.filter(post => {
                // Se comprueba si el array contiene el parametros que se pasa //
                // Se mira el nombre. Para ello se coge el nombre, se pone en minuscula y se compara con el parámetro pasado en minuscula //
                if(post.title.toLowerCase().includes(args.query.toLowerCase()) || post.body.toLowerCase().includes(args.query.toLowerCase())) {
                    return true
                } else {
                    return false
                }
            })
        },
        comments(parent, args, ctx, info) {
            return comments
        }
    },
    Mutation: {
        createUser(parent, args, ctx, info) {
            const emailTaken=users.some(user => { // Comprueba si el mail ya está cogido
                return user.email===args.email
            })
            if(emailTaken) { // Lanza un error si el mail ya está cogido
                throw new Error(`Email ${args.email} taken`)
            }
            const user={
                id: uuidv4(), // Crea un UUID random
                name: args.name,
                email: args.email,
                age: args.age
            }
            users.push(user)
            return user
        },
        createPost(parent, args, ctx, info) {
            const authorExists=users.some(user => { // Comprueba si el usuario existe
                return user.id===args.author
            })
            if(!authorExists) { // Lanza un error si el usuario no existe
                throw new Error(`Author "${args.author}" does not exist`)
            }
            const post={
                id: uuidv4(),
                title: args.title,
                body: args.body,
                published: true,
                author: args.author
            }
            posts.push(post)
            return post
        },
        createComment(parent, args, ctx, info) {
            const authorExists=users.some(user => { // Comprueba si el usuario existe
                return user.id===args.author
            })
            if(!authorExists) { // Lanza un error si el usuario no existe
                throw new Error(`Author "${args.author}" does not exist`)
            }
            const postExistsAndPublished=posts.some((post) => post.id === args.post && post.published)
            if(!postExistsAndPublished) { // Lanza un error si el post no existe o no está publicado
                throw new Error(`Post "${args.post}" does not exist or not published`)
            }
            const comment={                
                id: uuidv4(),
                text: args.text,
                author: args.author,
                post: args.post
            }
            comments.push(comment)
            return comment
        }
    },
    Post: { // En las relaciones, hay que indicar en los resolvers como obtener la información a los que se hace referencia
            // Se llama a esta función por cada post que se haya devuelto
        author(parent, args, ctx, info) {            
            return users.find(user => { // "find" busca el primero que cumpla la condicion
                return user.id === parent.author
            })
        },
        comments(parent, args, ctx, info)  {
            return comments.filter((comment) => {
                return comment.post === parent.id
            })
        }
    },
    User: { // En las relaciones, hay que indicar en los resolvers como obtener la información a los que se hace referencia
        // Se llama a esta función por cada user que se haya devuelto
        posts(parent, args, ctx, info) {            
            return posts.filter(post => {
                return post.author === parent.id // Devuelve los posts del usuario
            })
        },
        comments(parent, args, ctx, info)  {
            return comments.filter((comment) => {
                return comment.author === parent.id
            })
        }
    },
    Comment: { // En las relaciones, hay que indicar en los resolvers como obtener la información a los que se hace referencia
        // Se llama a esta función por cada comment que se haya devuelto
        author(parent, args, ctx, info) {            
            return users.find(user => {
                return user.id === parent.author // Devuelve el autor del comentario
            })
        },
        post(parent, args, ctx, info) {            
            return posts.find(post => {
                return post.id === parent.post // Devuelve el post del comentario
            })
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