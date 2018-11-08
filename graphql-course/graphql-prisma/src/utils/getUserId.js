import jwt from 'jsonwebtoken'

const getUserId = (request, requiereAuth = true) => { // Por defecto se pone a true así no hay que cmabiar nada en las llamadas a esté metodo con un solo parámetro
    const header=request.request.headers.authorization
    if(header) {
        const token=header.replace('Bearer ','') // Para quedarnos con el token. Hay que quitar Bearer
        const decoded=jwt.verify(token, 'thisisasecret')
        return decoded.userId
    }
    if(requiereAuth) {
        throw new Error('Authentication required!!!')
    }
    return null // Mejor que devolver undefined
}

export { getUserId as default }