"use client";

import { toast } from "sonner";

import { useParams } from "next/navigation";
import React, { ElementRef, useRef, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";

import { Layout } from "lucide-react";
import { FormInput } from "@/components/form/form-input";
import { Skeleton } from "@/components/ui/skeleton";

import { CardWithList } from "@/types"
import { useAction } from "@/hooks/use-action";
import { updateCard } from "@/actions/update-card";

interface HeaderProps {
    data: CardWithList
}

export const Header = ({
    data,
}: HeaderProps) => {
    const queryClient = useQueryClient();
    const params = useParams();

    const {execute} = useAction(updateCard, {
        onSuccess: data => {
            queryClient.invalidateQueries({
                queryKey: ['card', data.id]
            });

            queryClient.invalidateQueries({
                queryKey: ['card-logs', data.id]
            });
            
            toast.success(`Rename to "${data.title}"`);
            setTitle(data.title);
        },
        onError: error => {
            toast.error(error)
        }
    })

    const inputRef = useRef<ElementRef<'input'>>(null);

    const [title, setTitle] = useState(data.title);

    const onBlur = () => {
        inputRef.current?.form?.requestSubmit()
    }

    const onSubmit = (formData: FormData) => {
        const title = formData.get('title') as string;
        const boardId = params.boardId as string;

        execute({
            title,
            boardId,
            id: data.id,
        })

    }

    return(
        <div className="flex items-start gap-x-3 mb-6 w-full">
            <Layout className="h-5 w-5 mt-1 text-neutral-700"/>
            <div className="w-full">
                <form action={onSubmit}>
                    <FormInput
                        ref={inputRef}
                        onBlur={onBlur}
                        id="title"
                        defaultValue={title}
                        className="font-semibold text-xl px-1 text-neutral-700 bg-transparent border-transparent relative -left-1.5 w-[95%] focus-visible:bg-white focus-visible:border-input mb-0.5"
                    />
                </form>
                <p className="text-sm text-muted-foreground">
                    in list <span>"{data.list.title}"</span>
                </p>
            </div>
        </div>
    )
}

const HeaderSkeleton: React.FC = () => {
    return(
        <div className="flex items-start gap-x-3 mb-6 w-full">
            <Skeleton className="h-6 w-6 mt-1 text-neutral-200"/>
            <div className="w-full">
                <Skeleton className="h-24 w-6 mt-1 text-neutral-200"/>
                <Skeleton className="h-12 w-4 text-neutral-200"/>
            </div>
        </div>
    )
}

HeaderSkeleton.displayName = "Header.Skeleton";
Header.Skeleton = HeaderSkeleton;
