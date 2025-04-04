"use client";

import { useQuery } from "@tanstack/react-query";

import { AuditLog } from "@prisma/client";

import { Dialog, DialogContent } from "@/components/ui/dialog"

import { useCardModal } from "@/hooks/use-card-modal"
import { fetcher } from "@/lib/fetcher";
import { CardWithList } from "@/types";
import { Header } from "./header";
import { Description } from "./description";
import Actions from "./action";
import { Activity } from "./activity";

export const CardModal = () => {
    const id = useCardModal(state => state.id);
    const isOpen = useCardModal(state => state.isOpen);
    const onClose = useCardModal(state => state.onClose);

    //id の状態をログに出して確認
    console.log("querying card id:", id);

    const { data: cardData } = useQuery<CardWithList>({
        queryKey: ['card', id],
        queryFn: () => fetcher(`/api/cards/${id}`),
        enabled: !!id, // ← id が falsy（undefined, null, "" など）のときは実行しない

    });

    const {data: auditLogData} = useQuery<AuditLog[]>({
        queryKey: ['card-logs', id],
        queryFn: () => fetcher(`/api/cards/${id}/logs`),
        enabled: !!id,
    })

    return(
        <Dialog
            open={isOpen}
            onOpenChange={onClose}
        >
            <DialogContent>
                {!cardData
                    ? <Header.Skeleton/>
                    : <Header data={cardData}/>    
                }
                <div className="grid grid-cols-1 md:grid-cols-4 md:gap-4">
                    <div className="col-span-3">
                        <div className="w-full space-y-6">
                            {!cardData
                                ? <Description.Skeleton/> 
                                : <Description data={cardData}/>
                            }
                            {!auditLogData
                                ? <Activity.Skeleton/>
                                : <Activity items={auditLogData}/>
                            }
                        </div>
                    </div>
                    {!cardData
                        ? <Actions.Skeleton/>
                        : <Actions data={cardData}/>
                    }
                </div>
            </DialogContent>
        </Dialog>
    )
}