
// import { getCurrentUser } from '@/actions/getCurrentUser'
import { currentUser } from '@/lib/auth'
import prisma from '@/lib/prismadb'
import { NextResponse } from 'next/server'

export async function PUT(request: Request) {
    // const currentUser = await getCurrentUser()
    const user = await currentUser()

    if (!user) {
        return NextResponse.error()
    }

    if (user.role !== "ADMIN") {
        return NextResponse.error()
    }

    const body = await request.json()
    const { id, status } = body

    const order = await prisma.order.update({
        where: { id: id },
        data: { status }
    })

    return NextResponse.json(order)
}