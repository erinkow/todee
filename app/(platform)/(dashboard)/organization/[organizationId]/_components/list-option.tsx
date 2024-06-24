"use client";

import { toast } from "sonner";
import { ElementRef, useRef } from "react";

import { List } from "@prisma/client";

import { MoreHorizontal, X } from "lucide-react";
import { Popover, PopoverClose, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";

import { deleteList } from "@/actions/delete-list";
import { FormSubmit } from "@/components/form/form-submit";
import { useAction } from "@/hooks/use-action";
import { copyList } from "@/actions/copy-list";

interface ListOptionProps {
    data: List;
    onAddCard: () => void;
}

export const ListOption = ({
    data,
    onAddCard

}: ListOptionProps) => {
    const closeRef = useRef<ElementRef<'button'>>(null);

    const { execute: deleteExecute } = useAction(deleteList, {
        onSuccess: data => {
            toast.success(`List "${data.title}" deleted`)
            closeRef.current?.click();
        },
        onError: error => {
            toast.error(error)
        }
    })

    const { execute: copyExecute } = useAction(copyList, {
        onSuccess: data => {
            toast.success(`List "${data.title}" copied`);
            closeRef.current?.click();
        },
        onError: error => {
            toast.error(error);
        }
    })

    const onDelete = (formData: FormData) => {
        const id = formData.get('id') as string;
        const boardId = formData.get('boardId') as string;

        deleteExecute({
            id,
            boardId
        })
    }

    const onCopy = (formData: FormData) => {
        const id = formData.get('id') as string;
        const boardId = formData.get('boardId') as string;

        copyExecute({
            id, 
            boardId
        });
    }

    return(
     <Popover>
        <PopoverTrigger asChild>
            <Button
                className="h-auto w-auto p-2"
                variant='ghost'
            >
                <MoreHorizontal className="h-4 w-4"/>
            </Button>
        </PopoverTrigger>
        <PopoverContent className="px-0 pt-3 pb-3" side="bottom" align="start">
            <div className="text-sm font-medium text-center text-neutral-600 pb-4">
                List actions
            </div>
            <PopoverClose ref={closeRef} asChild>
                <Button
                    className="h-auto w-auto p-2 absolute top-2 right-2 text-neutral-600"
                    variant='ghost'
                >
                    <X className="h-4 w-4"/>
                </Button>
            </PopoverClose>
            <Button
                onClick={onAddCard}
                className="rounded-none w-full h-auto p-2 px-5 justify-start font-normal text-sm"
                variant='ghost'
            >
                Add card...
            </Button>
            <form action={onCopy}>
                <input hidden id="id" name="id" value={data.id}/>
                <input hidden id="boardId" name="boardId" value={data.boardId} />
                <FormSubmit
                    variant="ghost"
                    className="rounded-none w-full h-auto p-2 px-5 justify-start font-normal text-sm"
                >
                    Copy list...
                </FormSubmit>
            </form>
            <form action={onDelete}>
                <input hidden id="id" name="id" value={data.id} />
                <input hidden id="boardId" name="boardId" value={data.boardId}/>
                <FormSubmit
                    variant="ghost"
                    className="rounded-none w-full h-auto p-2 px-5 justify-start font-normal text-sm"
                >
                    Delete this list...
                </FormSubmit>
            </form>
        </PopoverContent>

     </Popover>   
    )
}