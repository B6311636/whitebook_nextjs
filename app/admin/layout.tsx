import Container from "../../components/Container";
import AdminNav from "../../components/admin/AdminNav";

export const metadata = {
    title: "Whitebook Admin",
    description: "Whitebook Admin Dashboard"
}

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div>
            <AdminNav />
            <Container>
                {children}
            </Container>
        </div>
    );
}

export default AdminLayout;