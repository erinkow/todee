import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

import { db } from "@/lib/db";

interface BoardIdPageProps {
    params: {
        boardId: string;
    }
}
const BoardIdPage = ({
    params
} : BoardIdPageProps) => {
    const { orgId } = auth();

    if(!orgId) {
        redirect('/select-org');
    }

    const lists = db.list.findMany({
        where: {
            boardId: params.boardId,
            board: {
                orgId,
            }
        },
        orderBy: {
            order: 'asc'
        },
    });

    return(
        <div className="p-4 h-full overflow-x-auto">
            {/* <ListContainer
                boardId={params.boardId}
                data={lists}
            /> */}
        </div>
    );
};

export default BoardIdPage;