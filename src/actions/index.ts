'use server'

import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const saveSnippet = async (id: number, code: string) => {
    await prisma.snippet.update({
        where: { id },
        data: { code }
    })
    // TO show fresh data on update the snippet
    revalidatePath(`/snippet/${id}`);

    redirect(`/snippet/${id}`);
}

export const deleteSnippet = async (id: number) => {
    await prisma.snippet.delete({
        where: { id }
    })
    revalidatePath("/");
    redirect("/");
}

// From snippet/new/page.tsx and then modify
export async function createSnippet(prevState: { message: string }, formData: FormData) {
    try {
        const title = formData.get("title");
        const code = formData.get("code");

        if (typeof title !== 'string' || title.trim().length < 8) {
            return { message: "Title is required and longer then 8 Char" }
        }
        if (typeof code !== 'string' || code.trim().length < 10) {
            return { message: "Code is required and longer then 10 char" }
        }

        await prisma.snippet.create({
            data: {
                title,
                code,
            },
        });

        revalidatePath("/");

    } catch (error: any) {
        return { message: error.message || "Something went wrong." };
    }

    redirect("/");
}