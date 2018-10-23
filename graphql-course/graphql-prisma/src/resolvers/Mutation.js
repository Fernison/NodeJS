import uuidv4 from 'uuid/v4'

const Mutation = {
    createUser(parent, args, {db}, info) {
        const emailTaken=db.users.some(user => { // Comprueba si el mail ya está cogido
            return user.email===args.data.email
        })
        if(emailTaken) { // Lanza un error si el mail ya está cogido
            throw new Error(`Email ${args.data.email} taken`)
        }
        const user={
            id: uuidv4(), // Crea un UUID random
            ...args.data // Copia el objecto args.data
        }
        db.users.push(user)
        return user
    },
    deleteUser(parent, args, {db}, info) {
        const userIndex=db.users.findIndex(user => user.id===args.id)
        if(userIndex===-1) {
            throw new Error(`User ${args.id} does not exist`)
        }
        // Borrar el usuario //
        const deletedUsers=db.users.splice(userIndex, 1) // Borra un elemento en userIndex. "deletedUser" es el array de elementos borrados
         // Borrar sus posts //
        db.posts=db.posts.filter(post => post.author !== args.id) // Reasignamos al array de posts los posts que no son del usuario
        // Borrar sus comments //
        db.comments=db.comments.filter(comment => comment.author !== args.id) // Reasignamos al array de comments los comments que no son de los posts borrados
        // Borrar los comments de los posts borrados (que puede que no sean del usuario borrado) //
        db.comments=db.comments.filter(comment => {
            const post_aux=db.posts.filter(post => {
                return post.id === comment.post
            })
            if(post_aux.length>0) {
                return true;
            }   
        })
        return deletedUsers[0]
    },
    updateUser(parent, args, {db}, info) {
        const {id, data} = args // Desestructura los atributos del objeto
        // Buscamos el usuario //
        const user=db.users.find(user => {
            return user.id === id
        })
        if(!user) {
            throw new Error(`User ${id} does not exist`)
        }
        // En el parametro "int" preguntamos por undefined. Del resto, sólo si existen
        if(typeof data.email === 'string') {
            const emailExist=db.users.find(user => {
                return user.email === data.email
            })
            if(emailExist) {
                throw new Error(`Email ${data.email} already exists`)
            }
            user.email=data.email
        }
        if(typeof data.name === 'string') {
            user.name=data.name
        }
        if(typeof data.age !== 'undefined') { // Es un entero y puede ser 0 por defecto. Por tanto, teneos que preguntar si viene o no
            user.age=data.age
        }   
        return user // No hace falta cambiar el array ya que se actualiza el objeto directamente
    },
    createPost(parent, args, {db, pubsub}, info) {
        const authorExists=db.users.some(user => { // Comprueba si el usuario existe
            return user.id===args.data.author
        })
        if(!authorExists) { // Lanza un error si el usuario no existe
            throw new Error(`Author "${args.data.author}" does not exist`)
        }
        const post={
            id: uuidv4(),
            ...args.data // Copia el objecto args.data
        }
        db.posts.push(post)
        if(args.data.published) {
            pubsub.publish('post', { 
                post : {
                        mutation: 'CREATED', // Indica el tipo de operación que se hace sobre el Post
                        data: post 
                    } // Se publica que se ha creado un nuevo post que está publicado    
                }
            )    
        }
        return post
    },        
    deletePost(parent, args, {db, pubsub}, info) {
        const postIndex=db.posts.findIndex(post => post.id===args.id)
        if(postIndex===-1) {
            throw new Error(`Post ${args.id} does not exist`)
        }
        // Borrar el post //
        const [post]=db.posts.splice(postIndex, 1) // Borra un elemento en postIndex. "deletedPosts" es el array de elementos borrados
        // Con array desestructurado para acceder a una posición del array directamente se pone const [post]=db.posts.splice(postIndex, 1)
                // es igual a:
                    // const deletedPosts=db.posts.splice(postIndex, 1)
                    // deletedPost[0]

        // Borrar los comments de los posts borrados //
        db.comments=db.comments.filter(comment => {
            const post_aux=db.posts.filter(post => {
                return post.id === comment.post
            })
            if(post_aux.length>0) {
                return true;
            }   
        })
        if(post.published) {
            pubsub.publish('post', { 
                post : {
                        mutation: 'DELETED', // Indica el tipo de operación que se hace sobre el Post
                        data: post 
                    }
                }
            ) 
        }
        return post
    },
    updatePost(parent, args, {db, pubsub}, info) {
        const {id, data} = args // Desestructura los atributos del objeto
        // Buscamos el post //
        const post=db.posts.find(post => {
            return post.id === id
        })
        const originalPost = { ...post } // Hace una copia de Post

        if(!post) {
            throw new Error(`Post ${id} does not exist`)
        }
        if(typeof data.title === 'string') {
            post.title=data.title
        }
        if(typeof data.body === 'string') {
            post.body=data.body
        }
        if(typeof data.published !== 'undefined') { 
            post.published=data.published
            // Si cambia de Publicado a No Publicado
            if(originalPost.published && !data.published) {
                // Deleted
                pubsub.publish('post', { 
                    post : {
                            mutation: 'DELETED', // Indica el tipo de operación que se hace sobre el Post
                            data: originalPost 
                        }
                    }
                ) 
            } else
            // Si cambia de No Publicado a Publicado
            if(!originalPost.published && data.published) {
                // Created
                pubsub.publish('post', { 
                    post : {
                            mutation: 'CREATED', // Indica el tipo de operación que se hace sobre el Post
                            data: post 
                        }
                    }
                ) 
            } else 
            // Si indica en la peticion que está publicado y ya está publicado
            if(originalPost.published && data.published) {
                // Updated
                pubsub.publish('post', { 
                    post : {
                            mutation: 'UPDATED', // Indica el tipo de operación que se hace sobre el Post
                            data: post 
                        }
                    }
                ) 
            }
        } else if(originalPost.published) {
            // Cualquier otro comportamiento. Sólo se notifica si el post está publicado
            // Updated
            pubsub.publish('post', { 
                post : {
                        mutation: 'UPDATED', // Indica el tipo de operación que se hace sobre el Post
                        data: post 
                    }
                }
            ) 
        }
        return post
    },
    createComment(parent, args, {db, pubsub}, info) {
        const authorExists=db.users.some(user => { // Comprueba si el usuario existe
            return user.id===args.data.author
        })
        if(!authorExists) { // Lanza un error si el usuario no existe
            throw new Error(`Author "${args.data.author}" does not exist`)
        }
        const postExistsAndPublished=db.posts.some((post) => post.id === args.data.post && post.published)
        if(!postExistsAndPublished) { // Lanza un error si el post no existe o no está publicado
            throw new Error(`Post "${args.data.post}" does not exist or not published`)
        }
        const comment={                
            id: uuidv4(),
            ...args.data // Copia el objecto args.data
        }
        db.comments.push(comment)
        pubsub.publish(`comment ${args.data.post}`, 
            {
                comment: {
                        mutation: 'CREATED', // Tiene que ser uno de los valores de la Enum
                        data: comment 
                    }
            }
        ) // Se publica que se ha creado un nuevo comentario
        return comment
    },        
    deleteComment(parent, args, {db, pubsub}, info) {
        const commentIndex=db.comments.findIndex(comment => comment.id===args.id)
        if(commentIndex===-1) {
            throw new Error(`Comment ${args.id} does not exist`)
        }
        // Borrar el comment //
        const [comment]=db.comments.splice(commentIndex, 1)
        pubsub.publish(`comment ${comment.post}`, 
            {
                comment: {
                        mutation: 'DELETED',
                        data: comment 
                    }
            }
        )
        return comment
    },
    updateComment(parent, args, {db, pubsub}, info) {
        const {id, data} = args // Desestructura los atributos del objeto
        // Buscamos el comment //
        const comment=db.comments.find(comment => {
            return comment.id === id
        })
        if(!comment) {
            throw new Error(`Comment ${id} does not exist`)
        } 
        if(typeof data.text === 'string') {
            comment.text=data.text
        } 
        pubsub.publish(`comment ${comment.post}`, 
            {
                comment: {
                        mutation: 'UPDATED',
                        data: comment 
                    }
            }
        )
        return comment
    }
}

export {Mutation as default}