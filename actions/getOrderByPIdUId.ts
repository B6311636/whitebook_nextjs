import prisma from '@/lib/prismadb'

interface IParams {
    userId?: string
    productId?: string
}

export default async function getOrdersByPidUid(params: IParams) {
    try {
        const { userId, productId } = params
        const orders = await prisma.order.findFirst({
            where: {
                userId: userId,
                status: 'complete',         // Replace with the actual userId
                products: {
                    some: {
                        id: productId       // Replace with the actual productId
                    }
                }
            }
        })

        // console.log(orders?.status)

        return !!orders;

    } catch (error: any) {
        throw new Error(error)
    }
}