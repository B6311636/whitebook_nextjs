import getUsers from "@/actions/getUsers";
import Container from "@/components/Container";
import NullData from "@/components/NullData";
import { currentUser } from "@/lib/auth";
import ManageUserClient from "./ManageUserClient";

const ManageUser = async () => {
    const users = await getUsers()
    const user = await currentUser()

    if (!user || user.role !== 'ADMIN') {
        return <NullData title="Oops! access denied" />
    }

    return (<div className="pt-8">
        <Container>
            <ManageUserClient users={users} />
        </Container>
    </div>);
}

export default ManageUser;