"use server";

import * as z from "zod";
import prisma from '@/lib/prismadb'
import { SettingsCategorySchema } from "@/schemas";
import { currentUser } from "@/lib/auth";

export const categories = async (
    values: z.infer<typeof SettingsCategorySchema>
) => {
    const validatedFields = SettingsCategorySchema.safeParse(values);

    if (!validatedFields.success) {
        return { error: "Invalid fields!" };
    }

    const { name } = validatedFields.data

    await prisma.category.create({
        data: {
            name,
        }
    });

    return { success: "Settings Updated!" }
}