"use server";

import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";

import { createSafeAction } from "@/lib/create-safe-action";
import { InputType, ReturnType } from "./types";
import { CreateBoard } from "./schema";
import { hasAvailableCount, incrementAvailableCount } from "@/constants/org-limit";

const handler = async (data: InputType): Promise<ReturnType> => {
    const { userId, orgId } = auth();

    if(!userId || !orgId) {
        return{
            error: 'Unauthorised'
        }
    }
    const canCreate = await hasAvailableCount();

    const { title, image } = data;

    const [
        imageId,
        imageThumbUrl,
        imageFullUrl,
        imageLinksHTML,
        imageUserName
    ] = image.split('|');

    console.log([
        imageId,
        imageThumbUrl,
        imageFullUrl,
        imageLinksHTML,
        imageUserName
    ])

    if (!imageId || !imageThumbUrl || !imageFullUrl || !imageUserName || !imageLinksHTML) {
        return{
            error: 'Missing fields. Failed to create board.'
        }
    }

    let board;

    try{
        board = await db.board.create({
            data: {
                title,
                orgId,
                imageId,
                imageThumbUrl,
                imageFullUrl,
                imageUserName,
                imageLinksHTML
            }
        });

        incrementAvailableCount();

        if(board) {
            revalidatePath(`/board/${board.id}`)
            return { data: board}
        } else {
            throw new Error('failed to create a board')
        }

    } catch(error) {
        console.error('Error creating board:', error)
        return {error: 'Failed to create board'};
    }
}

export const createBoard = createSafeAction(CreateBoard, handler)