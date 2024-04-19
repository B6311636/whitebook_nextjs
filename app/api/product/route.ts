
// import { getCurrentUser } from '@/actions/getCurrentUser'
import prisma from '@/lib/prismadb'
import { NextResponse } from 'next/server'
import { currentUser } from "@/lib/auth";

export async function POST(request: Request) {
    const user = await currentUser()
    
    if (!user) {
        return NextResponse.error()
    }

    if (user.role !== "ADMIN") {
        return NextResponse.error()
    }

    const body = await request.json()
    const { name, description, price, brand, category, inStock, images } = body

    const product = await prisma.product.create({
        data: {
            name,
            description,
            brand,
            category,
            inStock,
            images,
            price: parseFloat(price)
        }
    });

    return NextResponse.json(product)

}

export async function PUT(request: Request) {
    const user = await currentUser()
    if (!user || user.role !== "ADMIN") {
        return NextResponse.error()
    }

    const body = await request.json()
    const { id, inStock } = body

    const product = await prisma.product.update({
        where: { id: id },
        data: { inStock }
    })

    return NextResponse.json(product)
}