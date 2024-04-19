import Container from "@/components/Container";
import ManageHero from "./ManageHero";
import getWebInfo from "@/actions/getWebInfo";
import ManageName from "./ManageName";
import ManageEmail from "./ManageEmail";
import ManagePhone from "./ManagePhone";
import ManageFacebook from "./ManageFacebook";
import ManageLine from "./ManageLine";
import FormWrap from "@/components/FormWrap";
import ManageInfoClient from "./ManageInfoClient";
import Heading from "@/components/products/Heading";


const ManageInfo = async () => {

    const webinfo = await getWebInfo()
    // console.log(webinfo)

    return (<div className="pt-4">
        <Container>
            <FormWrap>
                <Heading title="Manage webinfo" />
                <ManageInfoClient infodata={webinfo} />
            </FormWrap>
        </Container>
    </div>);
}

export default ManageInfo;