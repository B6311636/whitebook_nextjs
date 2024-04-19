import Container from "../../components/Container";
import FormWrap from "../../components/FormWrap";
// import CheckoutClient from "./CheckoutClient";
import CheckoutClientNew from "./CheckoutClientNew";

const Checkout = () => {
    return (<div className="p-8">
        <Container>
            <FormWrap>
                <CheckoutClientNew />
            </FormWrap>
        </Container>
    </div>);
}

export default Checkout;