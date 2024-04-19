import prisma from '@/lib/prismadb'

interface IParams {
    productId?: string[]
}

export default async function getProductByArrId(params: IParams) {
    try {
        const { productId } = params
        const product = await prisma.product.findMany({
            where: {
                id: { in: productId }
            },
        })

        if (!product) {
            return null
        }

        return product
    } catch (error: any) {
        throw new Error(error)
    }
}