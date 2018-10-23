// Los métodos "subscribe" se ejecutan cada vez que alguien se suscribe
const Subscription = {
    count: {
        subscribe(parent, args, { pubsub }, info) {
            let count=0
            setInterval(() => { // Método de prueba para notificar cada segundo el incremento de count
                count++
                pubsub.publish('count', { // Se pasa un objeto
                    count: count // Se puede poner sólo "count"
                })
            }, 1000)
            // Los métodos subscribe no devuelven el valor que indicamos en el esquema (en este caso, count: Int!)
            // Devuelven pubsub.asyncIterator('[CHANNEL_NAME]'), donde CHANNEL_NAME identifica univocamente un canal de comunicación entre pub y sub        
            return pubsub.asyncIterator('count') 
        }
    },
    comment: {
        subscribe(parent, { postId }, {db, pubsub}, info) { // Se desestructuran los objetos cogiendo los atriibutos que necesitamos
            // Se compueba que se suscribe a un post que exista y esté publicado //
            const post = db.posts.find(post => {
                return (post.id===postId && post.published)
            })
            if(!post) {
                throw new Error(`Post ${postId} not found`)
            }
            return pubsub.asyncIterator(`comment ${postId}`) 
        }
    },
    post: {
        subscribe(parent, args, {db, pubsub}, info) {
            return pubsub.asyncIterator('post') 
        }
    }
}

export {Subscription as default}