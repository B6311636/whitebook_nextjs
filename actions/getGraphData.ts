import prisma from '@/lib/prismadb'
import moment from 'moment'


export default async function getGraphData() {
    try {
        // Get the start and end dates for the data range (7 days ago to today)
        const startDate = moment().subtract(6, "days").startOf("day")
        const endDate = moment().endOf("day")

        // Query the database to get order data group by createdDate
        const result = await prisma.order.groupBy({
            by: ["createDate"],
            where: {
                createDate: {
                    gte: startDate.toISOString(),
                    lte: endDate.toISOString()
                },
                status: "complete"
            },
            _sum: {
                amount: true
            }
        })

        // Initialize on object to aggregate the data by day
        const aggregetedDate: {
            [day: string]: { day: string; date: string; totalAmount: number }
        } = {}

        // Create a clone of the start date to iterate over each day
        const currentDate = startDate.clone()

        // Iterate over each day in the date range
        while (currentDate <= endDate) {
            // Format the ady as a string (e.g. "Monday")
            const day = currentDate.format("dddd")
            console.log("day<<<", day, currentDate)

            // Intialize the aggregated data for the day with the day, date, and totalAmount
            aggregetedDate[day] = {
                day,
                date: currentDate.format("YYYY-MM-DD"),
                totalAmount: 0
            }

            // Move to the next day
            currentDate.add(1, "day")
        }

        // Calculate the total amount for each day by summing the order amounts
        result.forEach((entry) => {
            const day = moment(entry.createDate).format("dddd")
            const amount = entry._sum.amount || 0
            aggregetedDate[day].totalAmount += amount
        })

        // Convert the aggregetedDate object to an array and sort it by date
        const formatedData = Object.values(aggregetedDate).sort((a, b) =>
            moment(a.date).diff(moment(b.date))
        )

        // Return the formatted data
        return formatedData

    } catch (error: any) {
        throw new Error(error)
    }
}