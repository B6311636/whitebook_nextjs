'use client'

import { Horizontal } from "@/app/product/[productId]/ProductDetails";
import Heading from "@/components/products/Heading";
import { User, Webinfo } from "@prisma/client";
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

interface ManageInfoClientProps {
    infodata: Webinfo
}

const ManageInfoClient: React.FC<ManageInfoClientProps> = ({ infodata }) => {

    console.log(infodata)
    
    return (<>
        <Heading title="Manage Information" />
        <Card className="w-[600px] shadow-md">
            <CardContent className="space-y-4 pt-4">
                <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                    <p className="text-sm font-medium">
                        ID
                    </p>
                    <p className="truncate text-xs max-w-[180px] font-mono p-1 bg-slate-100 rounded-md">
                        {infodata.id}
                    </p>
                </div>
                <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                    <p className="text-sm font-medium">
                        Name
                    </p>
                    <p className="truncate text-xs max-w-[180px] font-mono p-1 bg-slate-100 rounded-md">
                        {infodata?.name}
                    </p>
                </div>
                <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                    <p className="text-sm font-medium">
                        Email
                    </p>
                    <p className="truncate text-xs max-w-[180px] font-mono p-1 bg-slate-100 rounded-md">
                        {infodata?.email}
                    </p>
                </div>
                <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                    <p className="text-sm font-medium">
                        Phone
                    </p>
                    <p className="truncate text-xs max-w-[180px] font-mono p-1 bg-slate-100 rounded-md">
                        {infodata?.phone}
                    </p>
                </div>
                <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                    <p className="text-sm font-medium">
                        Facebook
                    </p>
                    <p className="truncate text-xs max-w-[180px] font-mono p-1 bg-slate-100 rounded-md">
                        {infodata?.facebook}
                    </p>
                </div>
                <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                    <p className="text-sm font-medium">
                        Line
                    </p>
                    <p className="truncate text-xs max-w-[180px] font-mono p-1 bg-slate-100 rounded-md">
                        {infodata?.line}
                    </p>
                </div>

            </CardContent>
        </Card>
    </>);
}

export default ManageInfoClient;