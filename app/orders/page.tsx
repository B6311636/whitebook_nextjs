
import Container from "@/components/Container";
import NullData from "@/components/NullData";
import OrdersClient from "./OrderClient";
import getOrdersByUserId from "@/actions/getOrdersByUserId";
import { currentUser } from "@/lib/auth";

const Orders = async () => {
    const user = await currentUser()

    if (!user || user.role !== 'ADMIN') {
        return <NullData title="Oops! access denied" />
    }

    const orders = await getOrdersByUserId(user.id)

    if (!orders) {
        return <NullData title="No order yet..." />
    }

    return (<div className="pt-8">
        <Container>
            <OrdersClient orders={orders} />
        </Container>
    </div>);
}

export default Orders;