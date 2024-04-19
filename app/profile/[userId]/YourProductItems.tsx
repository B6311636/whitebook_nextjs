'use client'

import Heading from "@/components/products/Heading";
import { useRouter } from "next/navigation";
import Image from 'next/image'
import { truncateText } from "@/utils/truncateText";

interface YourProductItemsProps {
    id: string;
    name: string;
    imgLink: string;
}

const YourProductItems: React.FC<YourProductItemsProps> = ({ id, name, imgLink }) => {

    const router = useRouter()

    return (<div>
        <div
            onClick={() => router.push(`/product/${id}`)}
            className="col-span-1 cursor-pointer border-[1.2px] border-slate-200 bg-slate-50 rounded-sm p-3 transition hover:scale-105 text-center text-sm">
            <div className="flex flex-col items-center w-full gap-1">
                <div className='aspect-square overflow-hidden relative w-full'>
                    <Image fill className='w-full h-full object-contain' src={imgLink} alt={name} />
                </div>
            </div>
            <div className='mt-4'>{truncateText(name)}</div>
        </div>
    </div>);
}

export default YourProductItems;