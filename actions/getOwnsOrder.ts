import prisma from '@/lib/prismadb'

export default async function getOwnsOrder(userId: string) {
    try {
        const orders = await prisma.order.findMany({
            include: {
                user: true,
            },
            orderBy: {
                createDate: 'desc'
            },
            where: {
                userId: userId
            }
        })

        return orders

    } catch (error: any) {
        throw new Error(error)
    }

}