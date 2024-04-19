import prisma from '@/lib/prismadb'

export interface IProductParams {
    category?: string | null
    searchTerm?: string | null
}

export default async function getProducts(params: IProductParams) {
    try {
        const { category, searchTerm } = params
        let searchString = searchTerm

        if (!searchTerm) {
            searchString = ''
        }

        let quary: any = {}

        if (category) {
            quary.category = category
        }

        const products = await prisma.product.findMany({
            where: {
                ...quary,
                OR: [
                    {
                        name: {
                            contains: searchString,
                            mode: 'insensitive'
                        },
                        description: {
                            contains: searchString,
                            mode: 'insensitive'
                        }
                    }
                ]
            },
            include: {
                reviews: {
                    include: {
                        user: true
                    },
                    orderBy: {
                        createdDate: 'desc'
                    }
                }
            }
        })

        return products

    } catch (error: any) {
        // console.log(error)
        throw new Error(error)
    }
}