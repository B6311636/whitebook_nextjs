'use client'

import { Order, User } from "@prisma/client"
import { DataGrid, GridColDef } from "@mui/x-data-grid"
import { formatPrice } from "@/utils/formatPrice"
import Heading from "@/components/products/Heading"
import Status from "@/components/Status"
import { MdAccessTimeFilled, MdClose, MdDeliveryDining, MdDone, MdRemoveRedEye } from "react-icons/md"
import ActionBtn from "@/components/ActionBtn"
import { useCallback } from "react"
import axios from "axios"
import toast from "react-hot-toast"
import { useRouter } from "next/navigation"
import moment from "moment"


interface ManageOrdersClientProps {
    orders: ExtendedOrder[]
}

type ExtendedOrder = Order & {
    user: User
}

const ManageOrdersClient: React.FC<ManageOrdersClientProps> = ({
    orders
}) => {
    let rows: any = []
    const router = useRouter()

    if (orders) {
        rows = orders.map((order) => {
            return {
                id: order.id,
                customer: order.user.name,
                amount: formatPrice(order.amount / 100),
                paymentStatus: order.status,
                date: moment(order.createDate).fromNow(),
                // deliveryStatus: order.deliveryStatus,
            }
        })
    }

    const columns: GridColDef[] = [
        { field: 'id', headerName: 'ID', width: 220 },
        { field: 'customer', headerName: 'Customer name', width: 130 },
        {
            field: 'amount', headerName: 'Amount(THB)', width: 130,
            renderCell:
                (params) => {
                    return (<div className="font-bold text-slate-800">
                        {params.row.amount}
                    </div>)
                }
        },
        // {
        //     field: 'deliveryStatus', headerName: 'Delivery Status', width: 120,
        //     renderCell:
        //         (params) => {
        //             return (<div >
        //                 {params.row.deliveryStatus === 'pending' ? (
        //                     <Status
        //                         text="pending"
        //                         icon={MdAccessTimeFilled}
        //                         bg="bg-slate-200"
        //                         color="text-slate-700"
        //                     />) : params.row.deliveryStatus === 'dispatched' ? (
        //                         <Status
        //                             text="dispatched"
        //                             icon={MdDeliveryDining}
        //                             bg="bg-purple-200"
        //                             color="text-purple-700"
        //                         />) : params.row.deliveryStatus === 'delivered' && (
        //                             <Status
        //                                 text="delivered"
        //                                 icon={MdDone}
        //                                 bg="bg-teal-200"
        //                                 color="text-teal-700"
        //                             />)}
        //             </div>)
        //         }
        // },
        {
            field: 'paymentStatus', headerName: 'Payment Status', width: 120,
            renderCell:
                (params) => {
                    return (<div >
                        {params.row.paymentStatus === 'pending' ? (
                            <Status
                                text="pending"
                                icon={MdAccessTimeFilled}
                                bg="bg-slate-200"
                                color="text-slate-700"
                            />) : params.row.paymentStatus === 'complete' && (
                                <Status
                                    text="completed"
                                    icon={MdDone}
                                    bg="bg-purple-200"
                                    color="text-purple-700"
                                />)}
                    </div>)
                }
        },
        { field: 'date', headerName: 'Date', width: 200, },
        {
            field: 'action', headerName: 'Action', width: 200,
            renderCell:
                (params) => {
                    return (<div className="flex justify-between gap-4 w-full">
                        <ActionBtn
                            icon={MdClose}
                            onClick={() => {
                                handleDispatch(params.row.id)
                            }}
                        />
                        <ActionBtn
                            icon={MdDone}
                            onClick={() => {
                                handleDeliver(params.row.id)
                            }}
                        />
                        <ActionBtn
                            icon={MdRemoveRedEye}
                            onClick={() => {
                                router.push(`/order/${params.row.id}`)
                            }}
                        />
                    </div>)
                }
        },
    ]

    const handleDeliver = useCallback((id: string) => {
        axios.put('/api/order', {
            id,
            status: 'complete'
        }).then((res) => {
            toast.success('Payment status changed')
            router.refresh()
        }).catch((err) => {
            toast.error('Oops! Something went wrong')
            console.log(err)
        })
    }, [])

    const handleDispatch = useCallback((id: string) => {
        axios.put('/api/order', {
            id,
            status: 'pending'
        }).then((res) => {
            toast.success('Payment status changed')
            router.refresh()
        }).catch((err) => {
            toast.error('Oops! Something went wrong')
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

export default ManageOrdersClient;