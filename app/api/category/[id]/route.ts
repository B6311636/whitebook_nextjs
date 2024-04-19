import { NextResponse } from "next/server";
import { currentUser } from "@/lib/auth";

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
    const user = await currentUser()

    if (!user) {
        return NextResponse.error()
    }

    if (user.role !== "ADMIN") {
        return NextResponse.error()
    }

    const category = await prisma?.category.delete({
        where: { id: params.id }
    })

    return NextResponse.json(category)
}