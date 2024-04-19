import { currentUser } from "@/lib/auth"
import bcrypt from 'bcrypt'
import prisma from '@/lib/prismadb'
import { NextResponse } from 'next/server'

export async function PUT(request: Request) {
    const user = await currentUser()
    if (!user || user.role !== "ADMIN") {
        return NextResponse.error()
    }

    const body = await request.json()
    const { id, inStock } = body

    // const product = await prisma.webinfo.update({
    //     where: { id: id },
    //     data: { inStock }
    // })

    return NextResponse.json(product)
}