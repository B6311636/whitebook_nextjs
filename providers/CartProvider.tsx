'use client'

import { CartContextProvider } from "@/hooks/useCart";

interface CartPorviderProps {
    children: React.ReactNode
}

const CartPorvider: React.FC<CartPorviderProps> = ({ children }) => {
    return (
        <CartContextProvider>
            {children}
        </CartContextProvider>
    );
}

export default CartPorvider;