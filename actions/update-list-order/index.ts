"use server";

import { auth } from "@clerk/nextjs/server";
import { InputType, ReturnType } from "./types";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

const handler = async(data: InputType): Promise<ReturnType> => {
    const { userId, orgId } = auth();

    if(!userId || !orgId) {
        return{
            error: 'Unauthrised'
        };
    }

    const { items, boardId } = data
    let lists;

    try {
        const transaction = items.map(list => 
            db.list.update({
                where: {
                    id: list.id,
                    board: {
                        orgId
                    },
                },
                data: {
                    order: list.order,
                }
            })
        )

        lists = await db.$transaction(transaction);
    } catch (error) {
        return {
            error: 'Failed to reorder'
        }
    }

    revalidatePath(`/board/${boardId}`);
    return{data: lists}
}