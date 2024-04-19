import Link from "next/link";
import Container from "../Container";
import CartCount from "./CartCount";
import UserMenu from "./UserMenu";

import Categories from "./Categories";
import SearchBar from "./SearchBar";

import { currentUser } from "@/lib/auth";
import getWebInfo from "@/actions/getWebInfo";
import getCategories from "@/actions/getCategories";

const Navbar = async () => {

    const categories = await getCategories()

    const user = await currentUser()
    const webinfo = await getWebInfo()

    return (
        <div className="sticky top-0 w-full bg-green-200 z-30 shadow-sm">
            <div className="py-4 border-b-[1px]">
                <Container>
                    <div className="flex items-center justify-between gap-3 md:gap-0">
                        <div className="flex items-center gap-8 md:gap-12">
                            <CartCount />
                            <div className="hidden md:block">
                                <SearchBar />
                            </div>
                        </div>
                        <Link href="/">{webinfo?.name}</Link>
                        <div>
                            <UserMenu currentUser={user} />
                        </div>
                    </div>
                </Container>
            </div>
            <Categories categories={categories} />
        </div>
    )
}

export default Navbar;