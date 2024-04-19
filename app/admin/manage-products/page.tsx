import getProducts from "@/actions/getProducts";
import ManageProductsClient from "./ManageProductsClient";
import Container from "@/components/Container";

import NullData from "@/components/NullData";
import { currentUser } from "@/lib/auth";

const ManageProducts = async () => {

    const products = await getProducts({ category: null })
    const user = await currentUser()

    if (!user || user.role !== 'ADMIN') {
        return <NullData title="Oops! access denied" />
    }

    return (<div className="pt-8">
        <Container>
            <ManageProductsClient products={products} />
        </Container>
    </div>);
}

export default ManageProducts;