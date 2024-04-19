import prisma from '@/lib/prismadb'

interface IParams {
    orderId?: string
}

export default async function getOrdersById(params: IParams) {
    try {
        const { orderId } = params
        const orders = await prisma.order.findUnique({
            where: {
                id: orderId
            }
        })

        // console.log(orderId)

        if (!orders) return null
        return orders
    } catch (error: any) {
        throw new Error(error)
    }
}