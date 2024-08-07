"use server";

import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

import { db } from "@/lib/db";
import { InputType, ReturnType } from "./types";
import { createSafeAction } from "@/lib/create-safe-action";
import { CreateList } from "./schema";
import { createAuditLog } from "@/lib/create-audit-log";
import { ACTION, ENTITY_TYPE } from "@prisma/client";

const handler = async (data: InputType): Promise<ReturnType> => {
    const { userId, orgId } = auth();

    if(!userId || !orgId) {
        return{
            error: 'Unauthorised'
        };
    }

    const {title, boardId} = data;
    let list;

    try {
        const board = await db.board.findUnique({
            where: {
                id: boardId,
                orgId
            },
        });

        if(!board) {
            return{
                error: 'Board not found',
            };
        }

        const lastList = await db.list.findFirst({
            where: { boardId: boardId},
            orderBy: { createdAt: 'desc'},
            select: { order: true },
        });

        const newOrder = lastList ? lastList.order + 1 : 1;
        list = await db.list.create({
            data: {
                title,
                boardId,
                order: newOrder
            }
        });

        await createAuditLog({
            entityId: list.id,
            entityType: ENTITY_TYPE.LIST,
            entityTitle: list.title,
            action: ACTION.CREATE,
        });

    } catch(error) {
        return {
            error: 'Failed to create',
        }
    }

    revalidatePath(`/board/${boardId}`);
    return{ data: list };
}

export const createList = createSafeAction(CreateList, handler);