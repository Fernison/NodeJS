import { Prisma } from 'prisma-binding'

const prisma=new Prisma({
    typeDefs: './src/generated/prisma.graphql', // No tiene que ser el de Prisma, ya que el de Prisma solo tiene el datamodel, no el resto de tipos
    endpoint: 'http://localhost:4466' // La URL de Prisma
})

// prisma.query contiene las queries
// prisma.mutations contiene las mutations
// prisma.subscriptions contiene las subscriptions
// prisma.exists contiene utilizades

// Peticion de ejemplo para obtener los usuarios. "users" coincide con el esquema
// Primero el Where, despues los campos a obtener (en formato graphql)
/* prisma.query.users(null, `
    { 
        id 
        name 
        email 
        posts { 
            id 
            title 
        } 
    }`).then((data) => {
        // Es una Promise
        // Esta es la callback que se ejecuta cuando termina la promesa
        // JSON.stringify sirve para mostrar en formato JSON. EL primer param son los datos, 
        //  el segundo los replacements por si hay que hacer algun cambio,
        //  el tercero son los espacios con los que se indenta
        console.log('Users: '+JSON.stringify(data, undefined, 2)) 
})
prisma.query.comments(null, `
    { 
        id 
        text 
        author { 
            id 
            name 
        } 
    }`).then((data) => {
        console.log('Comments: '+JSON.stringify(data, undefined, 2)) 
}) */

// Mutaciones
// El primer parámetro son los datos de la mutación
// El segundo, el post que recuperamos
// El siguiente ejemplo muestra un encadenado de Promises
// Primero se crea el Post y, hasta que no se crea, no se muestra la información de los users
/* prisma.mutation.createPost({
    data: {
        title: "Post con Prisma desde Node 2",
        body: "Body Prisma deswde Node 2",
        published: true,
        author: {
            connect: {
                id: "cjndau3jv000j0796lv12nfl7"
            }
        }
    }  
}, `
{ 
    id
    title
    author { 
        id 
        name 
    } 
}`).then((data) => {
    console.log('Post: '+JSON.stringify(data, undefined, 2)) 
    return prisma.query.users(null, `
    { 
        id 
        name 
        email 
        posts { 
            id 
            title 
        } 
    }`)
}).then((data) => {
    console.log('Users: '+JSON.stringify(data, undefined, 2)) 
}) */

// vamos a crear una función async-await
// 1.   Create new post
// 2.   Fetch info about the users
// Todo encadenado
/* const createPostForUser = async (authorId, data) => {
    const post=await(prisma.mutation.createPost({
        data: {
            ...data,
            author: {
                connect: {
                    id: authorId
                }
            } 
        }
    }, '{ id }'))
    const user=await(prisma.query.user({
        where: {
            id: authorId
        }    
    }, '{ id name posts { id title body }}'))
    return user
}

// Las funciones async devuelven una Promise //
createPostForUser('cjndau3jv000j0796lv12nfl7', {
    title: "Post con Prisma desde Node 31",
    body: "Body Prisma deswde Node 31",
    published: false
}).then(data => {
    console.log('User: '+JSON.stringify(data, undefined, 2)) 
}) */

// Crear un post, modificarlo y motrar todos los posts //
/* prisma.mutation.createPost({
    data: {
        title: "Post con Prisma desde Node 3",
        body: "Body Prisma deswde Node 3",
        published: false,
        author: {
            connect: {
                id: "cjndau3jv000j0796lv12nfl7"
            }
        } 
    }
}).then(data => {
    return prisma.mutation.updatePost({
        data: {
            body: "New body 3!!!!",
            published: true
        },
        where: {
            id: data.id
        }
    })
}).then(data => {
    return prisma.query.posts(null, `
    { 
        id 
        title 
        body 
        published
        author { 
            id 
            name 
        } 
    }`)    
}).then(data => {
    console.log('Posts: '+JSON.stringify(data, undefined, 2)) 
}) */

// Para comprobar si una entidad existe //
// Se puede comprobar cualquier atributo del objeto //
prisma.exists.Comment({
    id: "cjndawfaw000t0796ro2b5nev",
    text: "Nuevo comentario 1",
    "author": {
        "name": "Heinz"
    }
}).then(exist => {
    console.log(exist)
})


// Con aync-await. Crear un Post, actualizarlo, obtener el usuario del post
const createAndUpdatePostForUser = async (authorId, data) => {
    const userExists=await(prisma.exists.User({
        id: authorId
    }));
    if(!userExists) {
        throw new Error(`ùser ${authorId} does not exist`)
    }    
    // Crear post //
    let post=await(prisma.mutation.createPost({
        data: {
            ...data,
            author: {
                connect: {
                    id: authorId
                }
            } 
        }
    },))
    // Actualizar post //
    post=await(prisma.mutation.updatePost({
        data: {
            body: "New body 5!!!!",
            published: true
        },
        where: {
            id: post.id
        }
    },'{ author { id posts { id title body published } }}')) // Lo bueno de graphql es qye hay muchas formas de recoger información ahorrándose queries
/*     // Obtener el usuario //
    const user=await(prisma.query.user({
        where: {
            id: post.author.id // Podriamos usar tambien "authorId" que se ple pasa al método
        }
    },'{ id name posts { id title body published }}'))
    return user */
    return post
}

/* createAndUpdatePostForUser('cjndau3jv000j0796lv12nfl7', {
    title: "Post con Prisma desde Node 311",
    body: "Body Prisma deswde Node 311",
    published: false
}).then(data => {
    console.log('User: '+JSON.stringify(data, undefined, 2)) 
}).catch(e => {
    console.log(e)
}) */

// 1.   Use prisma.exists to verify tha posts exists
//  - If there is no post, throw error
// 2.   Quitar las queries innecesarias
// 3.   Controlar errores

const checkPostAndCreateAndUpdate = async(authorId, postId, postData) => {
    // Check if author exist //
    const authorExists=await(prisma.exists.User({
        id: authorId
    }))
    if(!authorExists) {
        // No existe el autor. Throw error //
        throw new Error(`User ${authorId} does not exist`)
    }
    // Check if post exist //
    const postExists=await(prisma.exists.Post({
        id: postId
    }))
    let post
    if(!postExists) {
        // No existe el autor. Se crea //
        post=await(prisma.mutation.createPost({
            data: {
                ...postData,
                author: {
                    connect: {
                        id: authorId
                    }
                } 
            }
        }, '{ id }'))
        postId = post.id
    }
    // Actualizar post //
    post=await(prisma.mutation.updatePost({
        data: {
            body: "New body 6!!!!",
            published: true
        },
        where: {
            id: postId
        }
    },'{ author { id posts { id title body published } }}')) // Gracias a graphQl se pueden consultar los posts y obtener la info de users
    return post
}

checkPostAndCreateAndUpdate('cjndau3jv000j0796lv12nfl7', 'cjnkcxekt00890796cbqlnsf0', {
    title: "Post con Prisma desde Node 411",
    body: "Body Prisma deswde Node 411",
    published: false
}).then(data => {
    console.log('User: '+JSON.stringify(data, undefined, 2)) 
}).catch(e => {
    console.log(e)
})