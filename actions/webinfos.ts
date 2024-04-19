"use server";

import * as z from "zod";
import bcrypt from "bcryptjs";

import { update } from "@/auth";
import prisma from '@/lib/prismadb'
import { SettingsWebInfoSchema } from "@/schemas";
import { getUserByEmail, getUserById } from "@/data/user";
import { currentUser } from "@/lib/auth";
import { generateVerificationToken } from "@/lib/tokens";
import { sendVerificationEmail } from "@/lib/mail";

export const webinfos = async (
  values: z.infer<typeof SettingsWebInfoSchema>
) => {
  const user = await currentUser();

  const updatedWebInfo = await prisma.webinfo.update({
    where: { id: '65ba057d8c3e0b7dacf643d2' },
    data: {
      ...values,
    }
  });

  return { success: "Settings Updated!" }
}