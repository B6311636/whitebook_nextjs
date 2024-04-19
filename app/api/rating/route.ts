
import { Review } from "@prisma/client";
import { NextResponse } from "next/server";
import { currentUser } from "@/lib/auth";

export async function POST(request: Request) {
    const user = await currentUser()

    if (!user) {
        return NextResponse.error()
    }

    const body = await request.json()
    const { comment, rating, product, userId } = body

    const deliveredOrder = user?.orders.some(order => {
        order.products.find(item => item.id === product.id) && order.deliveryStatus === 'delivered'
    })

    const userReview = product?.reviews.find(((review: Review) => {
        return review.userId === user.id
    }))

    if (userReview || !deliveredOrder) {
        return NextResponse.error()
    }

    const review = await prisma?.review.create({
        data: {
            comment,
            rating,
            productId: product.id,
            userId
        }
    })

    return NextResponse.json(review)
}