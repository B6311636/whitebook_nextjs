'use client'

import { useSearchParams } from "next/dist/client/components/navigation";
import { useRouter } from "next/navigation";
import queryString from "query-string";
import { useCallback } from "react";
import { IconType } from "react-icons";
import { GiWhiteBook } from "react-icons/gi";

interface CateogryProps {
    label: string
    selected?: boolean
}

const CategoryItem: React.FC<CateogryProps> = ({
    label, selected
}) => {

    const router = useRouter()
    const params = useSearchParams()

    const handleClick = useCallback(() => {
        if (label === 'All') {
            router.push('/')
        } else {
            let currentQuery = {}

            if (params) {
                currentQuery = queryString.parse(params.toString())
            }

            const updatedQuery: any = {
                ...currentQuery,
                category: label
            }

            const url = queryString.stringifyUrl(
                {
                    url: '/',
                    query: updatedQuery
                },
                {
                    skipNull: true
                }
            )

            router.push(url)
        }
    }, [label, params])

    return (<div className={`
    flex items-center justify-center text-center gap-1 p-2 border-b-2 hover:text-slate-800 transition cursor-pointer
    ${selected ? 'border-b-slate-800 text-slate-800' : 'border-transparent text-slate-500'}
    `}
        onClick={() => handleClick()}
    >
        <GiWhiteBook size={20} />
        <div className="font-medium text-sm">{label}</div>
    </div>);
}

export default CategoryItem;