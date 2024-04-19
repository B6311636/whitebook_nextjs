import Container from "@/components/Container";
import AddProductFrom from "./AddProductFrom";
import FormWrap from "@/components/FormWrap";

import NullData from "@/components/NullData";
import { currentUser } from "@/lib/auth";
import getCategories from "@/actions/getCategories";

const AddProducts = async () => {

    const categories = await getCategories()

    const user = await currentUser()

    if (!user || user.role !== 'ADMIN') {
        return <NullData title="Oops! access denied" />
    }

    return (<div>
        <FormWrap>
            <AddProductFrom categories={categories} />
        </FormWrap>
    </div>);
}

export default AddProducts;