import Container from "@/components/Container";
import ProfileDetails from "./ProfileDetails";
import getUserById from "@/actions/getUserById";
import { currentUser } from "@/lib/auth";
import FormWrap from "@/components/FormWrap";
import getOrdersByUserId from "@/actions/getOrdersByUserId";
import getProductByArrId from "@/actions/getProductByArrId";
import { Horizontal } from "@/app/product/[productId]/ProductDetails";
import YourProductItems from "./YourProductItems";
import Heading from "@/components/products/Heading";

interface IParams {
    userId: string
}

const Profile = async ({ params }: { params: IParams }) => {

    const user = await getUserById(params)
    const currentu = await currentUser()
    const orders = await getOrdersByUserId(params.userId)
    const ownproducts: string[] = [];

    await Promise.all(orders.map(async (item) => {
        await Promise.all(item.products.map(async (product) => {
            if (product.id !== null)
                ownproducts.push(product.id);
        }));
    }));

    const ownsPid = Array.from(new Set(ownproducts));

    const owns = await getProductByArrId({ productId: ownsPid })

    return (<div>
        <Container>
            <FormWrap>
                <ProfileDetails user={user} viewer={user?.id === currentu?.id} />
                <Horizontal />
                {
                    user?.id === currentu?.id && (
                        <>
                            <Heading title="Your collection" />
                            <div className="flex flex-row items-center justify-center gap-4">
                                {
                                    owns?.map((item) => (
                                        <div key={item.id}>
                                            <YourProductItems
                                                key={item.id}
                                                id={item.id}
                                                name={item.name}
                                                imgLink={item.images[0].image}
                                            />
                                        </div>
                                    ))
                                }
                            </div>
                        </>
                    )
                }
            </FormWrap>
        </Container>
    </div>);
}

export default Profile;