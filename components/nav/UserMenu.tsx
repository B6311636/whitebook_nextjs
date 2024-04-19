"use client"

import React, { useCallback, useState } from "react";
import Avatar from "../products/Avatar";
import { AiFillCaretDown } from "react-icons/ai";
import Link from "next/link";
import MenuItem from "./MenuItem";
import { signOut } from "next-auth/react";
import BackDrop from "./BackDrop";
import { SafeUser } from "@/types"

interface UserMenuProps {
    currentUser: SafeUser | null
}

const UserMenu: React.FC<UserMenuProps> = ({ currentUser }) => {
    const [isOpen, setIsOpen] = useState(false)
    const toggleOpen = useCallback(() => {
        setIsOpen((prev) => !prev)
    }, [])

    return (
        <>
            <div className=" relative z-30">
                <div onClick={toggleOpen}
                    className="
                p-2
                border-[1px]
                border-slate-400
                flex
                flex-row
                items-center
                gap-1
                rounded-full
                cursor-poiter
                hover:shadow-md
                transition
                text-slate-700"
                >
                    <Avatar src={currentUser?.image} />
                    <span>Hi, {currentUser?.name}</span>
                    <AiFillCaretDown />
                </div>
                {isOpen && (
                    <div className="absolute
                        rounded-md
                        shadow-md
                        w-[170px]
                        bg-white
                        overflow-hidden
                        right-0
                        top-12
                        text-sm
                        flex
                        flex-col
                        cursor-poiter"
                    >
                        {currentUser ? (
                            <div>
                                <Link href="/orders">
                                    <MenuItem onClick={toggleOpen}>
                                        Your orders
                                    </MenuItem>
                                </Link>
                                <Link href={`/profile/${currentUser.id}`}>
                                    <MenuItem onClick={toggleOpen}>
                                        Profile
                                    </MenuItem>
                                </Link>
                                {
                                    currentUser.role === "ADMIN" &&
                                    (
                                        <Link href="/admin">
                                            <MenuItem onClick={toggleOpen}>
                                                Admin Dashboard
                                            </MenuItem>
                                        </Link>
                                    )
                                }
                                <hr />
                                <MenuItem onClick={() => {
                                    toggleOpen()
                                    signOut()
                                }}>
                                    Logout
                                </MenuItem>
                            </div>
                        ) : (
                            <div>
                                <Link href="/auth/login">
                                    <MenuItem onClick={toggleOpen}>
                                        Login
                                    </MenuItem>
                                </Link>
                                <Link href="/auth/register">
                                    <MenuItem onClick={toggleOpen}>
                                        Register
                                    </MenuItem>
                                </Link>
                            </div>)
                        }
                    </div>
                )}
            </div>
            {isOpen && <BackDrop onClick={toggleOpen} />}
        </>);
}

export default UserMenu;