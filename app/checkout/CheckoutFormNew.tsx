"use client"

import { useCart } from "@/hooks/useCart";
import { formatPrice } from "@/utils/formatPrice";
import { useElements, useStripe, PaymentElement, AddressElement } from "@stripe/react-stripe-js";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Heading from "../../components/products/Heading";
import Button from "../../components/products/Button";

interface CheckoutFormNewProps {
    clientSecret: string,
    handleSetPaymentSucess: (value: boolean) => void
}

const CheckoutFormNew: React.FC<CheckoutFormNewProps> = ({ clientSecret, handleSetPaymentSucess }) => {

    console.log(clientSecret)

    const { cartTotalAmount, handleClearCart, handleSetPaymentIntent } = useCart()
    // const elements = useElements()
    const [isLoading, setIsLoading] = useState(false)
    const formattedPrice = formatPrice(cartTotalAmount)

    setIsLoading(true)


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        toast.success('Checkout Success')

        handleClearCart()
        handleSetPaymentSucess(true)
        handleSetPaymentIntent(null)
    }

    return (
        <form onSubmit={handleSubmit} id="payment-form">
            <div className="mb-6">
                <Heading title="Enter your detail to compleat checkout" />
            </div>
            <h2 className="font-semibold mt-4 mb-2">Payment Information</h2>
            {/* <PaymentElement id="payment-element" options={{
                layout: "tabs"
            }} /> */}
            <div className="py-4 text-center text-slate-700 text-4xl font-bold">
                Total: {formattedPrice}
            </div>
            <Button
                label={isLoading ? 'Processing' : 'Pay now'}
                disabled={isLoading}
                onClick={(e) => { handleSubmit(e) }}
            />
        </form>);
}

export default CheckoutFormNew;