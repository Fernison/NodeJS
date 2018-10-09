const Query = {
    me() { // Se puede declarar el método sin todos los parámetros: parent, args, ctx, info
        return {
            id: '12345678ABC',
            name: 'Fernison',
            email: 'heinz@dot.com'
        }    
    },
    post(parent, args, ctx, info) { // {db} indica que se coge el atributo db del objeto ctx
        return {
            id: '12345678ABC',
            title: 'titulo',
            body: 'Este es el cuerpo',
            published: true
        }
    },
    users(parent, args, {db}, info) {
        if(!args.query) {
            return db.users                
        }
        return db.users.filter(user => { // "filter" busca los que cumplan la condición
            // Se comprueba si el array contiene el parametros que se pasa //
            // Se mira el nombre. Para ello se coge el nombre, se pone en minuscula y se compara con el parámetro pasado en minuscula //
            return user.name.toLowerCase().includes(args.query.toLowerCase())
        })
    },
    posts(parent, args, {db}, info) {
        if(!args.query) {
            return db.posts                
        }
        return db.posts.filter(post => {
            // Se comprueba si el array contiene el parametros que se pasa //
            // Se mira el nombre. Para ello se coge el nombre, se pone en minuscula y se compara con el parámetro pasado en minuscula //
            if(post.title.toLowerCase().includes(args.query.toLowerCase()) || post.body.toLowerCase().includes(args.query.toLowerCase())) {
                return true
            } else {
                return false
            }
        })
    },
    comments(parent, args, {db}, info) {
        return db.comments
    }
}

export {Query as default}