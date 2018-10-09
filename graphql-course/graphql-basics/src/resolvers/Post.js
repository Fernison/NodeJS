const Post = { // En las relaciones, hay que indicar en los resolvers como obtener la información a los que se hace referencia
    // Se llama a esta función por cada post que se haya devuelto
    author(parent, args, {db}, info) {            
        return db.users.find(user => { // "find" busca el primero que cumpla la condicion
            return user.id === parent.author
        })
    },
    comments(parent, args, {db}, info)  {
        return db.comments.filter((comment) => {
            return comment.post === parent.id
        })
    }
}

export {Post as default}