const User = { // En las relaciones, hay que indicar en los resolvers como obtener la información a los que se hace referencia
    // Se llama a esta función por cada user que se haya devuelto
    posts(parent, args, {db}, info) {            
        return db.posts.filter(post => {
            return post.author === parent.id // Devuelve los posts del usuario
        })
    },
    comments(parent, args, {db}, info)  {
        return db.comments.filter((comment) => {
            return comment.author === parent.id
        })
    }
}

export {User as default}