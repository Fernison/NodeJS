// Los métodos "subscribe" se ejecutan cada vez que alguien se suscribe
const Subscription = {
    comment: {
        // Prisma ==> Node ==> Client (GrapfQL Playground)
        subscribe(parent, { postId }, { prisma }, info) {
            // Se recomienda que los atributos que devuelve Prisma en la suscripción coincidadn con los del backend con los clientes //
            return prisma.subscription.comment({
                where: {
                    node: {
                        post: {
                            id: postId
                        }    
                    }    
                }
            }, info)
        }    
    },
    post: {
        subscribe(parent, args, { prisma }, info) {
            return prisma.subscription.post({
                where: {
                    node: {
                        published: true
                    }    
                }
            }, info)
        }
    }
}

export {Subscription as default}