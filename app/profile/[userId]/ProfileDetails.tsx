'use client'

import { Horizontal } from "@/app/product/[productId]/ProductDetails";
import Heading from "@/components/products/Heading";
import { User } from "@prisma/client";
import Image from "next/image";
import { BiCheckShield } from "react-icons/bi";
import {
    Card,
    CardContent,
    CardHeader
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Button from "@/components/products/Button";
import { useRouter } from "next/navigation";

interface ProfileDetailsProps {
    user: User
    viewer: boolean
}

function capitalizeFirstLetter(input: string | null): string {
    if (!input) {
        return "User";  // Return input as is if it's an empty string or null/undefined.
    }

    return input.charAt(0).toUpperCase() + input.slice(1);
}

const ProfileDetails: React.FC<ProfileDetailsProps> = ({ user, viewer }) => {

    const router = useRouter()

    return (
        <>
            <Heading title={viewer ? "Your profile" : capitalizeFirstLetter(user.name) + " profile"} />
            <Card className="w-[600px] shadow-md">
                <CardContent className="space-y-4 pt-4">
                    <div className="flex flex-col items-center justify-center">
                        {/* <p>view? : {viewer ? 'true' : 'false'}</p> */}
                        <div className="relative w-[70px] aspect-square">
                            <Image src={user.image ? user.image : 'https://firebasestorage.googleapis.com/v0/b/whitebook-411409.appspot.com/o/user%2FOIP.jpg?alt=media&token=4c8a754e-6c6a-43be-82d7-b0c6dc2a0ebd'} alt={user.id} fill className="object-contain" />
                        </div>
                    </div>
                    <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                        <p className="text-sm font-medium">
                            ID
                        </p>
                        <p className="truncate text-xs max-w-[180px] font-mono p-1 bg-slate-100 rounded-md">
                            {user?.id}
                        </p>
                    </div>
                    <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                        <p className="text-sm font-medium">
                            Name
                        </p>
                        <p className="truncate text-xs max-w-[180px] font-mono p-1 bg-slate-100 rounded-md">
                            {user?.name}
                        </p>
                    </div>
                    <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                        <p className="text-sm font-medium">
                            Email
                        </p>
                        <p className="truncate text-xs max-w-[180px] font-mono p-1 bg-slate-100 rounded-md">
                            {user?.email}
                        </p>
                    </div>
                    <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                        <p className="text-sm font-medium">
                            Role
                        </p>
                        <p className="truncate text-xs max-w-[180px] font-mono p-1 bg-slate-100 rounded-md">
                            {user?.role}
                        </p>
                    </div>

                    <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                        <p className="text-sm font-medium">
                            Email Verified
                        </p>
                        <Badge
                            variant={user?.emailVerified ? "success" : "destructive"}
                        >
                            {user?.emailVerified ? "Verified" : "Not Verified"}
                        </Badge>
                    </div>

                    <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                        <p className="text-sm font-medium">
                            Two Factor Authentication
                        </p>
                        <Badge
                            variant={user?.isTwoFactorEnabled ? "success" : "destructive"}
                        >
                            {user?.isTwoFactorEnabled ? "ON" : "OFF"}
                        </Badge>
                    </div>

                    {
                        viewer && (
                            <div>
                                <Button
                                    label="Edit"
                                    onClick={() => router.push('/settings')}
                                />
                            </div>
                        )
                    }

                </CardContent>
            </Card>
        </>
    );
}

export default ProfileDetails;