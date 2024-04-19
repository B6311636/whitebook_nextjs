import { CartProductType } from "@/app/product/[productId]/ProductDetails";
import { createContext, useCallback, useContext, useState } from "react";

type CartContextType = {
    cartTotalQty: number;
    cartProducts: CartContextType[] | null;
    handleAddProductToCart: (product: CartProductType) => void
}

export const CartContext = createContext<CartContextType | null>(null);

interface Props {
    [propName: string]: any;
}

export const CartContextProvider = (props: Props) => {
    const [cartTotalQty, setcartTotalQty] = useState(0)
    const [cartProducts, setCartProducts] = useState<CartContextType[] | null>(null)

    const handleAddProductToCart = useCallback(() => { 

    }, []);

    const value = {
        cartTotalQty,
        cartProducts,
        handleAddProductToCart,
    }

    return <CartContext.Provider value={value} {...props} />
}

export const useCart = () => {
    const context = useContext(CartContext);

    return context
}