import Container from "../../components/Container";
import FormWrap from "../../components/FormWrap";
import RegisterForm from "./RegisterForm";
import ConfirmModal from "../../components/modal/ComfirmModal";
import { currentUser } from "@/lib/auth";

const Register = async () => {

    const user = await currentUser()

    return (
        <Container>
            <FormWrap>
                <RegisterForm currentUser={user} />
            </FormWrap>
        </Container>
    );
}

export default Register;