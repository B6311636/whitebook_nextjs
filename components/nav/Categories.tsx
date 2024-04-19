'use client'

// import { categories } from "@/utils/Categories"
import Container from "../Container"
import CategoryItem from "./CategoryItem"
import { usePathname, useSearchParams } from "next/navigation"
import getCategories from "@/actions/getCategories"
import { Category } from "@prisma/client"

interface CategoriesProps {
    categories: Category[]
}

const Categories: React.FC<CategoriesProps> = ({ categories }) => {

    const params = useSearchParams()
    const category = params?.get('category')
    const pathname = usePathname()
    const isMainPage = pathname === '/'

    if (!isMainPage) {
        return null
    }

    return (<div className="bg-white">
        <Container>
            <div className="pt-4 flex felx-row items-center justify-between overflow-x-auto">
                <CategoryItem
                    key="All"
                    label="All"
                    selected={category === "All" || (category === null)}
                />
                {categories.map((item) => (
                    <CategoryItem
                        key={item.name}
                        label={item.name}
                        selected={category === item.name || (category === null && item.name === 'All')}
                    />
                ))}
            </div>
        </Container>
    </div>)
}

export default Categories;