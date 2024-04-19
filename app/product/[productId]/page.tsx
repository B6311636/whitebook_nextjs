
import Container from "@/components/Container";
import ProductDetails from "./ProductDetails";
// import { product } from "@/utils/product";
import ListRating from "./ListRating";
import { products } from "@/utils/products";
import getProductById from "@/actions/getProductById";
import NullData from "@/components/NullData";
import AddRating from "./AddRating";
import { currentUser } from "@/lib/auth";
import getOrdersByPidUid from "@/actions/getOrderByPIdUId";

interface IParams {
    productId?: string
}

const Product = async ({ params }: { params: IParams }) => {

    const product = await getProductById(params)
    const user = await currentUser()

    const isOwner = await getOrdersByPidUid({
        userId: user?.id,
        productId: product?.id
    })

    console.log(isOwner)

    if (!product) {
        return <NullData title="Oops! product with the given id does not exit" />
    }

    return <div>
        <Container>
            <ProductDetails product={product} isOwner={isOwner} />
            {/* <div className="flex flax-col mt-20 gap-4">
                <div>
                    <AddRating
                        product={product}
                        user={user}
                    />
                    <ListRating product={product} />
                </div>
            </div> */}
        </Container>
    </div>
}

export default Product;