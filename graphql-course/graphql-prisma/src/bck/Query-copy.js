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
        const opArgs = {}
        if(args.query) {
            opArgs.where = {
                OR: [{
                    title_contains: args.query
                }, {
                    body_contains: args.query
                }]
            }
        }
        return prisma.query.posts(opArgs, info)
    },
    comments(parent, args, { prisma }, info) {
        return prisma.query.comments(null, info)
    }
}

export {Query as default}