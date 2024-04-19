
import Container from "../../components/Container";
import FormWrap from "../../components/FormWrap";
import LoginForm from "./LoginForm";
import { currentUser } from "@/lib/auth";

const Login = async () => {

    const user = await currentUser()

    return (
        <Container>
            <FormWrap>
                <LoginForm currentUser={user} />
            </FormWrap>
        </Container>
    );
}

export default Login;