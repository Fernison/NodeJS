import { Prisma } from 'prisma-binding'

const prisma=new Prisma({
    typeDefs: './src/generated/prisma.graphql', // No tiene que ser el de Prisma, ya que el de Prisma solo tiene el datamodel, no el resto de tipos
    endpoint: 'http://localhost:4466', // La URL de Prisma
    secret: 'thisismysecreta' // Se crete de Prisma indicado en prisma.yml
})

export { prisma as default }