import getUserId from '../utils/getUserId';

const Query = {
    me(parent, args, { prisma, request }, info) {        
        const userId=getUserId(request) 
        return prisma.query.user({
            where: {
                id: userId
            }
        }, info)
    },
    async post(parent, args, { prisma, request }, info) { // {db} indica que se coge el atributo db del objeto ctx        
        const userId=getUserId(request, false)        
        const posts=await prisma.query.posts({
            where: { // Se lee: "donde: id es igual a args.id Y (O published es true O el author.id es userId)""
                id: args.id,
                OR: [{
                    published: true
                }, {
                    author: {
                        id: userId
                    }
                }]
            }
        }, info)
        if(posts.length === 0) {
            throw new Error('No posts found')
        }
        return posts[0]
    },
    users(parent, args, { prisma }, info) {
        const opArgs = {} // Objeto que contiene el where
        if(args.query) { // Si se pasa el parámetro "query"
            opArgs.where = {
                OR: [{ // Así se hace un OR. Array de objetos poniendo las condiciones del OR
                    name_contains: args.query
                }, {
                    email_contains: args.query
                }]
            }
        }
        // El primer paráemtro es el "Where", el segundo el "What" se pide
        // se puede pasar:
        //  - nothing. Devuelve por defecto (scalar types). No devuelve datos relacionados
        //  - string. Devuelve lo que se le pide. Problema. Se le pone explicitamente lo que se necesita y a veces depende de lo que pase el cliente
        //  - object. "info" contiene información de la petición. Se le puede pasar directamente a prisma ya que contiene el cuerpo de la petición
        return prisma.query.users(opArgs, info) // Se puede return directamente ya que actúan como promises
    },
    posts(parent, args, { prisma }, info) {
        const opArgs = { 
            where: {
                published: true
            }
        }
        if(args.query) {
            opArgs.where.OR = [{
                title_contains: args.query
            }, {
                body_contains: args.query
            }]
        }
        return prisma.query.posts(opArgs, info)
    },
    myPosts(parent, args, { prisma, request }, info) {
        const userId=getUserId(request) 
        const opArgs = { 
            where: {
                author: {
                    id: userId
                }    
            }
        }
        if(args.query) {
            opArgs.where.OR = [{
                title_contains: args.query
            }, {
                body_contains: args.query
            }]
        }
        return prisma.query.posts(opArgs, info)
    },
    comments(parent, args, { prisma }, info) {
        return prisma.query.comments(null, info)
    }
}

export {Query as default}