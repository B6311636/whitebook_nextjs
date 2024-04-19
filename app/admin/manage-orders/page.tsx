
import getOrders from "@/actions/getOrders";
import Container from "@/components/Container";
import NullData from "@/components/NullData";
import ManageOrdersClient from "./ManageOrdersClient";
import { currentUser } from "@/lib/auth";

const ManageOrders = async () => {
    const orders = await getOrders()
    const user = await currentUser()

    if (!user || user.role !== 'ADMIN') {
        return <NullData title="Oops! access denied" />
    }

    return (<div className="pt-8">
        <Container>
            <ManageOrdersClient orders={orders} />
        </Container>
    </div>);
}

export default ManageOrders;