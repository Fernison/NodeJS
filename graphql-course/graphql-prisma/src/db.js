const users=[
    {
        id: '11',
        name: 'Heinz',
        email: 'heinz@dot.com'
    },
    {
        id: '22',
        name: 'clander',
        email: 'clander@dot.com'
    },
    {
        id: '33',
        name: 'clanderrrr',
        email: 'muander@dot.com',
        age: 34
    }  
]

const posts=[
    {
        id: '1',
        title: 'titulo1',
        body: 'Este es el cuerpo1',
        published: true,
        author: '11' // Se pone el id del usuario
    },
    {
        id: '2',
        title: 'titulo12',
        body: 'Este es el cuerpo2',
        published: true,
        author: '22' // Se pone el id del usuario
    },
    {
        id: '3',
        title: 'titulo3',
        body: 'Este es el cuerpo23',
        published: false,
        author: '33' // Se pone el id del usuario
    },
    {
        id: '4',
        title: 'titulo4',
        body: 'Este es el cuerpo44',
        published: false,
        author: '33' // Se pone el id del usuario
    }
]

const comments=[
    {
        id: '1',
        text: 'comment 1',
        author: '11',
        post: '1'
    },
    {
        id: '2',
        text: 'comment 2',
        author: '22',
        post: '1'
    },
    {
        id: '3',
        text: 'comment 3',
        author: '33',
        post: '3'
    },
    {
        id: '4',
        text: 'comment 4',
        author: '11',
        post: '3'
    }
]

const db = {
    users,
    posts,
    comments
}

export {db as default}