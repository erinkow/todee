import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";

import { db } from "@/lib/db";

export async function GET(
    req: Request,
    {params}: {params: {cardId: string}}
) {
    try {
        const {userId, orgId} = auth();

        if(!userId || !orgId) {
            return new NextResponse('Unauthorised', {status: 401});
        }

        const cardId = params.cardId;
        if (!cardId || cardId === "undefined") {
        return new NextResponse("Invalid Card ID", { status: 400 });
        }

        // const card = await db.card.findUnique({
        const card = await db.card.findFirst({
            where: {
                id: params.cardId,
                list: {
                    board: {
                        orgId,
                    },
                },
            },
            include: {
                list: {
                    select: {
                        title: true,
                    },
                },
            },
        });

        return NextResponse.json(card);

    } catch (error) {
        console.error("Card API error:", error); 
        return new NextResponse('Internal Error', {status: 500});
    }
}