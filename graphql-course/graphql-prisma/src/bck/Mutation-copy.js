import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { assertValidSchema } from 'graphql';
import getUserId from '../utils/getUserId';


// El propio Prisma comprueba si las condiciones de los Where se cumplen o no.
// Si alguna de las condiciones Where no se cumplen (id usuario, por ejemplo), devuelve un error, pero no personalizado. Para controlarlo, mejor hacer primas.exists //
// Aplica todas las restricciones. Por ejemplo, la unicidad del email //
const Mutation = {
    async loginUser(parent, args, { prisma }, info) {
        // Comprobar pwd //
        const user=await prisma.query.user({
            where: {
                email: args.data.email
            }    
        })
        if(!user) {
            throw new Error(`User not found!!!`)
        }
        if(!await bcrypt.compare(args.data.password, user.password)) {
            throw new Error(`Authentication error!!!`)
        }
        return {
            user,
            token: jwt.sign({ userId: user.id}, 'thisisasecret')
        }   
    },    
    async createUser(parent, args, { prisma }, info) { // Método async y llamadas con await a Prisma
        // Lo hago así para controlar el error personalmente
        const emailTaken=await prisma.exists.User({email: args.data.email})
        if(emailTaken) { // Lanza un error si el mail ya está cogido
            throw new Error(`Email ${args.data.email} taken`)
        }
        // Password //
        // Validarla
        if(args.data.password.length < 8) {
            throw new Error(`Password must be 8 characters or longer`)
        }
        // Hash. Usamos BCript module
        // El segundo parámetro es "salt", que es un número random de carcateres que se añaden al hash para hacerlo más resguro. Pasamos la longitud
        const password=await bcrypt.hash(args.data.password, 10)
        //////////////
        // Primero se pasa el usuario a crear.
        // Segundo, la info del usuario creado
        const user=await prisma.mutation.createUser({ 
            data: {
                ...args.data,
                password: password
            } 
        }) // No devolvemos nada (info) y devuelve todos los scalar types por defecto. Esto es porque sólo se podría devolver información del user y estamos pidiendo token
        return { // Se devuelve un objeto de tipo AuthPayload (contenido en el esquema)
            user,
            token: jwt.sign({ userId: user.id}, 'thisisasecret')
        }    
    },
    async deleteUser(parent, args, { prisma }, info) {
        const userExist=await prisma.exists.User({ id: args.id })
        if(!userExist) {
            throw new Error(`User ${args.id} does not exist`)
        }
        // Si se devuelve la propia llamada al método no es necesario porner await
        return prisma.mutation.deleteUser({ 
            where: {
                id: args.id 
            }
        }, info)
    },
    async updateUser(parent, args, { prisma }, info) {
        // Como los atributos de mi esquema son los mismos que los de Prisma se pueden pasar directamente
        // Prisma sabe qué atributos cambiar
        return await prisma.mutation.updateUser({
            where: {
                id: args.id
            },
            data: args.data
        }, info)

        // Mi forma. Lo compruebo yo manualmente //
/*         const {id, data} = args
        const userExist=await prisma.exists.User({ id: id })
        if(!userExist) {
            throw new Error(`User ${id} does not exist`)
        }
        const dataPrisma = {}
        if(typeof data.email === 'string') {
            const emailTaken=await prisma.exists.User({email: data.email})
            if(emailTaken) { // Lanza un error si el mail ya está cogido
                throw new Error(`Email ${args.data.email} taken`)
            }
            dataPrisma.email=data.email
        }
        if(typeof data.name === 'string') {
            dataPrisma.name=data.name
        }
        return await prisma.mutation.updateUser({
            where: {
                id: id
            },
            data: dataPrisma
        }, info) */
    },
    createPost(parent, args, { prisma, request }, info) {
        const userId=getUserId(request)
        return prisma.mutation.createPost({ 
            data: {
                title: args.data.title,
                body: args.data.body,
                published: args.data.published,
                author: {
                    connect: {
                        id: userId
                    }
                }
            }    
        }, info)
    },        
    async deletePost(parent, args, { prisma, pubsub }, info) {
        return prisma.mutation.deletePost({ 
            where: {
                id: args.id
            }        
        }, info)
    },
    async updatePost(parent, args, { prisma, pubsub }, info) {
        const {id, data} = args // Desestructura los atributos del objeto
        // Obtener el post original //
        const originalPost=await prisma.query.post({
            where: {
                id: id
            }
        })
        if(!originalPost) {
            throw new Error(`Post ${id} does not exist`)
        }
        return prisma.mutation.updatePost({
            where: {
                id: id
            },
            data: data
        }, info)        
    },
    async createComment(parent, args, { prisma, pubsub }, info) {
        const authorExists=await prisma.exists.User({ id: args.data.author })
        if(!authorExists) { // Lanza un error si el usuario no existe
            throw new Error(`Author "${args.data.author}" does not exist`)
        }
        const post=await prisma.query.post({ 
            where: {
                id: args.data.post 
            }
        }, '{ published }')
        if(!post || !post.published) {
            throw new Error(`Post "${args.data.post}" does not exist or not published`)
        }
        return prisma.mutation.createComment({ 
            data: {
                text: args.data.text,
                author: {
                    connect: {
                        id: args.data.author
                    }
                },
                post: {
                    connect: {
                        id: args.data.post
                    }
                }
            }
        }, info)
    },        
    deleteComment(parent, args, { prisma, pubsub }, info) {
        return prisma.mutation.deleteComment( {
            where: {
                id: args.id
            }
        }, info)
    },
    async updateComment(parent, args, { prisma, pubsub }, info) {
        return prisma.mutation.updateComment({            
            where: {
                id: args.id
            },
            data: {
                text: args.data.text                
            }
        }, info)
    }
}

export {Mutation as default}