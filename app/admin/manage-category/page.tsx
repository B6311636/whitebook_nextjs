import Container from "@/components/Container";
import ManageCategoryClient from "./ManageCategoryClient";
import getCategories from "@/actions/getCategories";
import AddCategoryClient from "./AddCategoryClient";

const ManageCategory = async () => {

    const categories = await getCategories()
    return (<div className="pt-8">
        <Container>
            <AddCategoryClient />
            <ManageCategoryClient categories={categories} />
        </Container>
    </div>);
}

export default ManageCategory;