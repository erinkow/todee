"use client";

import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { ElementRef, useRef, useState } from "react";
import { useEventListener, useOnClickOutside } from "usehooks-ts";

import { AlignLeft } from "lucide-react";
import { FormSubmit } from "@/components/form/form-submit";
import { FormTextarea } from "@/components/form/form-textarea";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

import { CardWithList } from "@/types"
import { useAction } from "@/hooks/use-action";
import { updateCard } from "@/actions/update-card";

interface DescriptionProps {
    data: CardWithList;
}

export const Description = ({
    data,
}: DescriptionProps) => {
    const [isEditing, setIsEditing] = useState(false);
    const params = useParams();
    const queryClient = useQueryClient();

    const textareaRef = useRef<ElementRef<'textarea'>>(null);
    const formRef = useRef<ElementRef<'form'>>(null);

    const { execute, fieldErrors } = useAction(updateCard, {
        onSuccess: data => {
            queryClient.invalidateQueries({
                queryKey: ['card', data.id],
            });

            queryClient.invalidateQueries({
                queryKey: ['card-logs', data.id],
            });

            toast.success(`Card "${data.title}" updated`)
            disableEditing();
        },
        onError: error => {
            toast.error(error)
        }
    })

    const enableEditing = () => {
        setIsEditing(true);
        setTimeout(() => {
            textareaRef.current?.focus();
        });
    }

    const disableEditing = () => {
        setIsEditing(false);
    }

    const onKeyDown = (e: KeyboardEvent) => {
        if(e.key === 'Escape') {
            disableEditing();
        }
    }

    useOnClickOutside(formRef, disableEditing);
    useEventListener('keydown', onKeyDown);

    const onsubmit = (formData: FormData) => {
        const description = formData.get('description') as string;
        const boardId = params.boardId as string;

        execute({
            id: data.id,
            description,
            boardId,
        })
    }

    return(
        <div className="flex items-start gap-x-3 w-full">
            <AlignLeft className="w-5 h-5 text-neutral-500"/>
            <div className="w-full">
                <p className="font-semibold text-neutral-700 mb-2">
                    Description
                </p>
                {isEditing ? (
                    <form 
                        action={onsubmit}
                        ref={formRef}
                        className="space-y-2"
                    >
                        <FormTextarea
                            id="description"
                            placeholder="Add a more detailed description"
                            defaultValue={data.description || undefined}
                            className="w-full mt-2"
                            errors={fieldErrors}
                            ref={textareaRef}
                        />
                        <div className="flex items-center gap-x-2">
                            <FormSubmit>
                                Save
                            </FormSubmit>
                            <Button
                                type="button"
                                onClick={disableEditing}
                                size='sm'
                                variant='ghost'
                            >
                                Cancel
                            </Button>
                        </div>
                    </form>
                ) : (
                    <div
                        onClick={enableEditing}
                        role="button"
                        className="min-h-[78px] bg-neutral-200 font-medium py-3 px-3.5 rounded-md text-neutral-700"
                    >
                        {data.description || 'Add a more detailed description...'}
                    </div>
                )}
            </div>
        </div>
    )
}

Description.Skeleton = function DescriptionSkeleton() {
    return(
        <div className="flex items-start gap-x-3 w-full">
            <Skeleton className="w-6 h-6 bg-neutral-200"/>
            <div className="w-full">
                <Skeleton className="w-24 h-6 bg-neutral-200"/>
                <Skeleton className="w-full h-6 bg-neutral-200"/>
            </div>
        </div>
    )
}