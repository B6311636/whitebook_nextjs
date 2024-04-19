
import prisma from '@/lib/prismadb'
import { NextResponse } from "next/server";
import { CartProductType } from "@/app/product/[productId]/ProductDetails";
import Stripe from 'stripe';
import { currentUser } from "@/lib/auth";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, { apiVersion: '2023-10-16' });

const calculateOrderAmount = (items: CartProductType[]) => {
    const totalPrice = items.reduce((acc, items) => {
        const itemsTotal = items.price * items.quantity

        return acc + itemsTotal
    }, 0)

    // can change if have a batter solution => not frindly with .xxx
    const price: any = Math.floor(totalPrice)

    return price
}

export async function POST(request: Request) {
    const user = await currentUser()

    if (!user) {
        return NextResponse.error()
    }

    const body = await request.json()
    const { items, payment_intent_id } = body
    const total = calculateOrderAmount(items) * 100
    const orderData = {
        user: { connect: { id: user.id } },
        amount: total,
        currency: 'thb',
        status: "pending",
        deliveryStatus: "pending",
        paymentIntentId: payment_intent_id,
        products: items
    }

    console.log(stripe.paymentIntents)

    if (payment_intent_id) {

        const current_intent = await stripe.paymentIntents.retrieve(payment_intent_id)

        if (current_intent) {
            const update_intent = await stripe.paymentIntents.update(
                payment_intent_id,
                { amount: total }
            )
            // update the order

            const [existing_order, update_order] = await Promise.all([
                prisma.order.findFirst({
                    where: {
                        paymentIntentId: payment_intent_id
                    }
                }),
                prisma.order.update({
                    where: { paymentIntentId: payment_intent_id },
                    data: {
                        amount: total,
                        products: items
                    }
                })
            ])

            if (!existing_order) {
                return NextResponse.error()
            }

            return NextResponse.json({ paymentIntent: update_intent })
        }

    } else {
        // create the intent
        const paymentIntent = await stripe.paymentIntents.create({
            amount: total,
            currency: 'thb',
            automatic_payment_methods: { enabled: true }
        })

        console.log(paymentIntent);


        // create the order
        orderData.paymentIntentId = paymentIntent.id

        await prisma.order.create({
            data: orderData
        })

        return NextResponse.json({ paymentIntent })

    }

    // Return a defult response (e.g. an error response) if none of the conditions are met
    return NextResponse.error()
}