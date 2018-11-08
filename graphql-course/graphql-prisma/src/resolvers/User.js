import getUserId from '../utils/getUserId';

const User = { 
    // Comprobar que email se puede devolver
    // Tratamiento especifico de este atributo (email) de User
    email(parent, args, { prisma, request }, info) {
        const userId=getUserId(request, false)    
        if(userId && userId===parent.id) { // Si está autenticado y userId coincide con el del parent (OJO: Esto se puede hacer si en la query se solicita el id del User)
            return parent.email
        }
        return null
    }
}

export {User as default}