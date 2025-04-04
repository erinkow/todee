"use client";

import { toast } from "sonner";

import { MoreHorizontal, X } from "lucide-react";
import { Popover, PopoverClose, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";

import { useAction } from "@/hooks/use-action";
import { deleteBoard } from "@/actions/delete-board";

interface BoardOptionProps {
    id: string;
}

export const BoardOption = ({id}: BoardOptionProps) => {
    const { execute, isLoading } = useAction(deleteBoard, {
        onError: error => {
            toast.error(error);
        }
    });

    const onDelete = () => {
        execute({id});
    }
    return(
        <Popover>
            <PopoverTrigger asChild>
                <Button className="h-auto w-auto p-2 pt-3" variant='transparent'>
                    <MoreHorizontal className="h-4 w-4"/>
                </Button>
            </PopoverTrigger>
            <PopoverContent
                className="px-0 pt-3 pb-3 mr-2"
                side="bottom"
                align="start"
            >
                <div className="text-sm font-medium text-center text-neutral-600 pb-4">
                    Board actions
                </div>
                <PopoverClose>
                    <Button
                        className="h-auto w-auto p-2 absolute top-2 right-2 text-neutral-600"
                        variant="ghost"
                    >
                        <X className="h-4 w-4"/>
                    </Button>
                </PopoverClose>
                <Button
                    variant='ghost'
                    onClick={onDelete}
                    disabled={isLoading}
                    className="rounded-none w-full h-auto p-2 px-5 justify-start font-medium text-sm text-neutral-600"
                >
                    Delete this board
                </Button>
            </PopoverContent>
        </Popover>
    )
}