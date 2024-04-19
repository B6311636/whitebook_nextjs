import prisma from '@/lib/prismadb'

export default async function getWebInfo() {
    try {
        const webinformation = prisma?.webinfo.findFirst()

        if (!webinformation) {
            return
        }

        return webinformation
    } catch (error: any) {
        throw new Error(error)
    }
}