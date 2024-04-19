
import Container from "@/components/Container";
import OrderDetails from "./OrderDetails";
import getOrdersById from "@/actions/getOrderById";
import NullData from "@/components/NullData";
import { string } from "zod";

interface IParams {
    orderId?: string
}

const Order = async ({ params }: { params: IParams }) => {

    // console.log(params.orderId)
    // const orderId = params?.orderId

    const order =await getOrdersById(params)

    // console.log(order)

    if (!order) return <NullData title="No order"></NullData>

    return <div>
        <Container>
            <OrderDetails order={order} />
        </Container>
    </div>
}

export default Order;