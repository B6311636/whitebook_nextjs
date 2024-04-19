'use client'

import Link from "next/link";
import AdminNavItem from "./AdminNavItem";
import { usePathname } from "next/navigation";
import { MdDashboard, MdDns, MdFormatListBulleted, MdLibraryAdd } from "react-icons/md"
import Container from "../Container";

const AdminNav = () => {

    const pathname = usePathname()

    return (
        <div className="w-full shadow-sm top-20 border-b-[1px] pt-4">
            <Container>
                <div
                    className="
                            flex 
                            flex-row 
                            items-center 
                            justify-between 
                            md:justify-center 
                            gap-8
                            md:gap-12 
                            overflow-x-auto 
                            flex-nowrap
                ">
                    <Link href='/admin'>
                        <AdminNavItem label="Summary" icon={MdDashboard} selected={pathname === '/admin'} />
                    </Link>
                    <Link href='/admin/add-products'>
                        <AdminNavItem label="Add Products" icon={MdLibraryAdd} selected={pathname === '/admin/add-products'} />
                    </Link>
                    <Link href='/admin/manage-users'>
                        <AdminNavItem label="Users" icon={MdDns} selected={pathname === '/admin/manage-users'} />
                    </Link>
                    <Link href='/admin/manage-products'>
                        <AdminNavItem label="Products" icon={MdDns} selected={pathname === '/admin/manage-products'} />
                    </Link>
                    <Link href='/admin/manage-category'>
                        <AdminNavItem label="Category" icon={MdFormatListBulleted} selected={pathname === '/admin/manage-category'} />
                    </Link>
                    <Link href='/admin/manage-orders'>
                        <AdminNavItem label="Orders" icon={MdFormatListBulleted} selected={pathname === '/admin/manage-orders'} />
                    </Link>
                    <Link href='/admin/manage-info'>
                        <AdminNavItem label="Information" icon={MdFormatListBulleted} selected={pathname === '/admin/manage-info'} />
                    </Link>
                </div>
            </Container>
        </div>
    );
}

export default AdminNav;