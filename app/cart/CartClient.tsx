'use client'

import { useCart } from "@/hooks/useCart";
import { ClassNames } from "@emotion/react";
import Link from "next/link";
import Heading from "../../components/products/Heading";
import Button from "../../components/products/Button";
import ItemContent from "./ItemContent";
import { formatPrice } from "@/utils/formatPrice";
import { SafeUser } from "@/types";
import { useRouter } from "next/navigation";

interface CartClientProps {
    currentUser: SafeUser | null
}

const CartClient: React.FC<CartClientProps> = ({ currentUser }) => {
    const { cartProducts, cartTotalAmount, cartTotalQty, handleClearCart } = useCart()

    const router = useRouter()

    console.log(cartTotalAmount)

    if (!cartProducts || cartProducts.length === 0) {
        return (
            <div className="flex flex-col items-center">
                <div className="text-2xl">Your cart is empty</div>
                <div>
                    <Link href={"/"} className="text-slate-500 flex items-center gap-1 mt-2">
                        <span>Start shopping</span>
                    </Link>
                </div>
            </div>
        )
    }

    return <div>
        <Heading title="Shopping Cart" center />
        <div className="grid grid-cols-2 text-sm gap-4 pb-2 items-center mt-8">
            <div className="cal-span-2 justify-self-start">Book</div>
            {/* <div className="justify-self-center">PRICE</div>
            <div className="justify-self-center">QUANTITY</div> */}
            <div className="justify-self-end">Price</div>
        </div>
        <div>
            {cartProducts && cartProducts.map((item) => {
                return <ItemContent key={item.id} item={item} />
            })}
        </div>
        <div className="border-t-[1.5px] border-slate-200 py-4 flex justify-between gap-4">
            <div className="w-[90px]">
                <Button label="Clear Cart" onClick={() => { handleClearCart() }} small />
            </div>
            <div className="text-sm flex-col flex items-start">

                <div className="flex justify-between w-full text-base font-semibold">
                    <span>Total</span>
                    <span>{formatPrice(cartTotalAmount)}</span>
                </div>

                <p className="text-slate-500">-----------------------------------------------</p>
                <Button
                    label={currentUser ? 'Checkout' : 'Login to checkout'}
                    outline={currentUser ? false : true}
                    onClick={() => { currentUser ? router.push('/checkout') : router.push('/login') }}
                />
                <Link href={"/"} className="text-slate-500 flex items-center gap-1 mt-2">
                    <span>Continue shopping</span>
                </Link>
            </div>
        </div>
    </div>;
}

export default CartClient;