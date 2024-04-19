'use client'

import Button from "@/components/products/Button";
import ProductImage from "@/components/products/ProductImage";
import SetQuantity from "@/components/products/SetQuantity";
import SetColor from "@/components/products/setColor";
import { useCart } from "@/hooks/useCart";
import { currentUser } from "@/lib/auth";
import { Rating } from "@mui/material";
import { useRouter } from "next/navigation";
import { type } from "os";
import { useCallback, useEffect, useState } from "react";

interface ProductDetailsProps {
    product: any
    isOwner: boolean
}

export type CartProductType = {
    id: string,
    name: string,
    description: string,
    category: string,
    brand: string,
    selectedImg: SelectedImgType,
    quantity: number,
    price: number,
}

export type SelectedImgType = {
    color: string,
    colorCode: string,
    image: string,
}

export const Horizontal = () => {
    return <hr className="w-[30%] my-2" />
}

const ProductDetails: React.FC<ProductDetailsProps> = ({ product, isOwner }) => {

    const { handleAddProductToCart, cartProducts } = useCart()

    const [isProductInCart, setIsProductInCart] = useState(false)

    const { cartTotalQty } = useCart()

    const [cartProduct, SetCartProduct] = useState<CartProductType>({
        id: product.id,
        name: product.name,
        description: product.description,
        category: product.category,
        brand: product.brand,
        selectedImg: { ...product.images[0] },
        quantity: 1,
        price: product.price,
    })

    const router = useRouter()

    useEffect(() => {
        setIsProductInCart(false)
        if (cartProducts) {
            const existingIndex = cartProducts.findIndex((item) => item.id === product.id)

            if (existingIndex > -1) {
                setIsProductInCart(true)
            }
        }
    }, [cartProducts])

    const productRating = product.reviews.reduce((acc: number, item: any) => item.rating + acc, 0) / product.reviews.length

    const handleColorSelect = useCallback((value: SelectedImgType) => {
        SetCartProduct((prev) => {
            return { ...prev, selectedImg: value }
        })
    }, [cartProduct.selectedImg])

    const handleQtyIncrease = useCallback(() => {

        if (cartProduct.quantity === 99) {
            return;
        }

        SetCartProduct((prev) => {
            return { ...prev, quantity: prev.quantity + 1 }
        })
    }, [cartProduct])
    const handleQtyDecrease = useCallback(() => {

        if (cartProduct.quantity === 1) {
            return;
        }

        SetCartProduct((prev) => {
            return { ...prev, quantity: prev.quantity - 1 }
        })
    }, [cartProduct])

    return <div className="grid grid-cols-1 md:grid-cols-2 gap-2 p-8">
        <div>
            <ProductImage
                cartProduct={cartProduct}
                product={product}
                handleColorSelect={handleColorSelect}
            />
        </div>
        <div className="flex flex-col gap-1 text-slate-500 test-sm">
            <h2 className="text-3xl font-medium text-slate-700">{product.name}</h2>
            <div className="flex items-center gap-2">
                <Rating value={productRating} readOnly />
                <div>{product.reviews.length} reviews</div>
            </div>
            <Horizontal />
            <div className="text-justify">{product.description}H</div>
            <Horizontal />
            <div>
                <span className="font-semibold">Category: </span>{product.category}
            </div>
            <div>
                <span className="font-semibold">Publisher: </span>{product.brand}
            </div>
            <div className={product.inStock ? "text-teal-400" : "text-rose-400"}>
                {product.inStock ? "On sell" : "waiting"}
            </div>
            <Horizontal />
            {isProductInCart ? <>
                <p className="mb-2 text-slate-500 flex items-center"><span className="text-teal-900">Product added to Cart</span></p>
                <div className="max-w-[300px]">
                    <Button label="View Cart" outline onClick={() => {
                        router.push('/cart')
                    }} />
                </div>
            </> :
                <>
                    {/* <div><SetColor
                        cartProduct={cartProduct}
                        images={product.images}
                        handColorSelect={handleColorSelect}
                    /></div> */}
                    {/* <Horizontal /> */}
                    {/* <SetQuantity
                        cartProduct={cartProduct}
                        handleQtyDecrease={handleQtyDecrease}
                        handleQtyIncrease={handleQtyIncrease}
                    /> */}
                    {/* <Horizontal /> */}
                    <div className="max-w-[300px]">
                        {
                            product.inStock ? isOwner ? (
                                <Button
                                    outline
                                    label="Read"
                                    onClick={() => router.push('/read/' + product.id)}
                                />
                            ) : (
                                <Button
                                    outline
                                    label="Add to Cart"
                                    onClick={() => handleAddProductToCart(cartProduct)}
                                />
                            ) : (
                                <p>For now product is not on sell</p>
                            )
                        }

                    </div>
                </>}
        </div>
    </div >
}
export default ProductDetails;