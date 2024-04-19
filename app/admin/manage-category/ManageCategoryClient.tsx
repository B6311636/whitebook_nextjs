'use client'

import { Category, User } from "@prisma/client"
import { DataGrid, GridColDef } from "@mui/x-data-grid"
import { formatPrice } from "@/utils/formatPrice"
import Heading from "@/components/products/Heading"
import Status from "@/components/Status"
import { MdAccessTimeFilled, MdClose, MdDelete, MdDeliveryDining, MdDone, MdRemoveRedEye } from "react-icons/md"
import ActionBtn from "@/components/ActionBtn"
import { useCallback } from "react"
import axios from "axios"
import toast from "react-hot-toast"
import { useRouter } from "next/navigation"
import moment from "moment"


interface ManageCategoryClientProps {
    categories: ExtendedOrder[]
}

type ExtendedOrder = Category & {
    // user: User
}

const ManageCategoryClient: React.FC<ManageCategoryClientProps> = ({
    categories
}) => {

    console.log(categories)

    let rows: any = []
    const router = useRouter()

    if (categories) {
        rows = categories.map((category) => {
            return {
                id: category.id,
                name: category.name,
            }
        })
    }

    const columns: GridColDef[] = [
        { field: 'name', headerName: 'Category name', width: 800 },
        {
            field: 'action', headerName: 'Action', width: 50,
            renderCell:
                (params) => {
                    return (<div className="flex justify-between gap-4 w-full">
                        <ActionBtn
                            icon={MdDelete}
                            onClick={() => {
                                handleDelete(params.row.id)
                            }}
                        />
                    </div>)
                }
        },
    ]

    const handleDelete = useCallback(async (id: string) => {
        toast('Deleting product, please wait!')

        axios.delete(`/api/category/${id}`).then((res) => {
            toast.success('Item deleted')
            router.refresh()
        }).catch((err) => {
            toast.error('Failed to delete item')
            console.log(err)
        })
    }, [])

    return (<div className="max-w-[1150px] m-auto text-xl">
        <div className="mb-4 mt-8">
            <Heading
                title="Manage Orders"
            />
        </div>
        <div style={{ height: 600, width: "100%" }}>
            <DataGrid
                rows={rows}
                columns={columns}
                initialState={{
                    pagination: {
                        paginationModel: { page: 0, pageSize: 5 },
                    },
                }}
                pageSizeOptions={[9, 20]}
                checkboxSelection
                disableRowSelectionOnClick
            />
        </div>
    </div>);
}

export default ManageCategoryClient;