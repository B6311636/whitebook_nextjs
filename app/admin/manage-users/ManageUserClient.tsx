'use client'

import Heading from "@/components/products/Heading";
import { User } from "@prisma/client";

import { Product } from "@prisma/client"
import { DataGrid, GridColDef } from "@mui/x-data-grid"
import { formatPrice } from "@/utils/formatPrice"
import Status from "@/components/Status"
import { MdCached, MdClose, MdDelete, MdDone, MdRemoveRedEye } from "react-icons/md"
import ActionBtn from "@/components/ActionBtn"
import { useCallback } from "react"
import axios from "axios"
import toast from "react-hot-toast"
import { useRouter } from "next/navigation"
import { deleteObject, getStorage, ref } from "firebase/storage"
import firebaseApp from "@/lib/firebase"





interface ManageUserClientProps {
    users: User[]
}

const ManageUserClient: React.FC<ManageUserClientProps> = ({ users }) => {

    console.log(users)
    let rows: any = []
    const storage = getStorage(firebaseApp)
    const router = useRouter()

    if (users) {
        rows = users.map((user) => {
            return {
                id: user.id,
                name: user.name,
                email: user.email,
                emailVerified: user.emailVerified,
                image: user.image,
                password: user.password,
                role: user.role,
                isTwoFactorEnabled: user.isTwoFactorEnabled,
            }
        })
    }

    const columns: GridColDef[] = [
        { field: 'id', headerName: 'ID', width: 220 },
        { field: 'name', headerName: 'Name', width: 220 },
        { field: 'email', headerName: 'Email', width: 220 },
        { field: 'emailVerified', headerName: 'Verified', width: 220 },
        { field: 'image', headerName: 'Img', width: 220 },
        { field: 'password', headerName: 'Password', width: 220 },
        { field: 'role', headerName: 'Role', width: 220 },
        { field: 'isTwoFactorEnabled', headerName: '2fa', width: 220 },
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

export default ManageUserClient;