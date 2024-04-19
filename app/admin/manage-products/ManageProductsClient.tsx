'use client'

import { Product } from "@prisma/client"
import { DataGrid, GridColDef } from "@mui/x-data-grid"
import { formatPrice } from "@/utils/formatPrice"
import Heading from "@/components/products/Heading"
import Status from "@/components/Status"
import { MdCached, MdClose, MdDelete, MdDone, MdRemoveRedEye } from "react-icons/md"
import ActionBtn from "@/components/ActionBtn"
import { useCallback } from "react"
import axios from "axios"
import toast from "react-hot-toast"
import { useRouter } from "next/navigation"
import { deleteObject, getStorage, ref } from "firebase/storage"
import firebaseApp from "@/lib/firebase"


interface ManageProductsClientProps {
    products: Product[]
}

const ManageProductsClient: React.FC<ManageProductsClientProps> = ({
    products
}) => {
    let rows: any = []
    const storage = getStorage(firebaseApp)
    const router = useRouter()

    if (products) {
        rows = products.map((product) => {
            return {
                id: product.id,
                name: product.name,
                price: formatPrice(product.price),
                category: product.category,
                brand: product.brand,
                inStock: product.inStock,
                images: product.images
            }
        })
    }

    const columns: GridColDef[] = [
        { field: 'id', headerName: 'ID', width: 220 },
        { field: 'name', headerName: 'Name', width: 220 },
        {
            field: 'price', headerName: 'Price(THB)', width: 100,
            renderCell:
                (params) => {
                    return (<div className="font-bold text-slate-800">
                        {params.row.price}
                    </div>)
                }
        },
        { field: 'category', headerName: 'Category', width: 100 },
        { field: 'brand', headerName: 'Brand', width: 100 },
        {
            field: 'inStock', headerName: 'In Stock', width: 120,
            renderCell:
                (params) => {
                    return (<div >
                        {params.row.inStock === true ?
                            (
                                <Status
                                    text="on sell"
                                    icon={MdDone}
                                    bg="bg-teal-200"
                                    color="text-teal-700"
                                />
                            ) : (
                                <Status
                                    text="waiting"
                                    icon={MdClose}
                                    bg="bg-rose-200"
                                    color="text-rose-700"
                                />)}
                    </div>)
                }
        },
        {
            field: 'action', headerName: 'Action', width: 200,
            renderCell:
                (params) => {
                    return (<div className="flex justify-between gap-4 w-full">
                        <ActionBtn
                            icon={MdCached}
                            onClick={() => {
                                handleToggleStock(params.row.id, params.row.inStock)
                            }}
                        />
                        <ActionBtn
                            icon={MdDelete}
                            onClick={() => {
                                handleDelete(params.row.id, params.row.images)
                            }}
                        />
                        <ActionBtn
                            icon={MdRemoveRedEye}
                            onClick={() => {
                                router.push(`/product/${params.row.id}`)
                            }}
                        />
                    </div>)
                }
        },
    ]

    const handleToggleStock = useCallback((id: string, inStock: boolean) => {
        axios.put('/api/product', {
            id,
            inStock: !inStock
        }).then((res) => {
            toast.success('Product status changed')
            router.refresh()
        }).catch((err) => {
            toast.error('Oops! Something went wrong')
            console.log(err)
        })
    }, [])

    const handleDelete = useCallback(async (id: string, images: any[]) => {
        toast('Deleting product, please wait!')

        const handleImageDelete = async () => {
            try {
                for (const item of images) {
                    if (item.image) {
                        const imageRef = ref(storage, item.image)
                        await deleteObject(imageRef)
                        console.log('img deleted', item.image)
                    }
                }
            } catch (error) {
                return console.log("Deleting image error: " + error)
            }
        }

        await handleImageDelete()

        axios.delete(`/api/product/${id}`).then((res) => {
            toast.success('Product deleted')
            router.refresh()
        }).catch((err) => {
            toast.error('Failed to delete product')
            console.log(err)
        })
    }, [])

    return (<div className="max-w-[1150px] m-auto text-xl">
        <div className="mb-4 mt-8">
            <Heading
                title="Manage Products"
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

export default ManageProductsClient;