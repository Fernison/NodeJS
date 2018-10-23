const Comment = { // En las relaciones, hay que indicar en los resolvers como obtener la información a los que se hace referencia
    // Se llama a esta función por cada comment que se haya devuelto
    author(parent, args, {db}, info) {            
        return db.users.find(user => {
            return user.id === parent.author // Devuelve el autor del comentario
        })
    },
    post(parent, args, {db}, info) {            
        return db.posts.find(post => {
            return post.id === parent.post // Devuelve el post del comentario
        })
    }            
}

export {Comment as default}