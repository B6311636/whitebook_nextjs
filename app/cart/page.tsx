
import Container from "../../components/Container";
import CartClient from "./CartClient";
import { currentUser } from "@/lib/auth";


const Cart = async () => {

    const user = await currentUser()

    return <div className="pt-8">
        <Container>
            <CartClient currentUser={user} />
        </Container>
    </div>
}

export default Cart;