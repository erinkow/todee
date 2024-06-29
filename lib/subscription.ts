import { auth } from "@clerk/nextjs/server"
import { db } from "./db";

const DAY_IN_MS = 86_400_000;

// Stripe有効期限が本日より1日後、つまり明日まで有効かどうかを判定する関数
export const checkSubscription = async() => {
    const { orgId } = auth();

    if(!orgId) {
        return false;
    }

    const orgSubscription = await db.orgSubscription.findUnique({
        where: {
            orgId,
        },
        select: {
            stripeCustomerId: true,
            stripeSubscriptionId: true,
            stripePriceId: true,
            stripeCurrentPeriodEnd: true,
        },
    });

    if(!orgSubscription) {
        return false
    }

    const isValid = 
        orgSubscription.stripePriceId &&
        orgSubscription.stripeCurrentPeriodEnd?.getTime()! + DAY_IN_MS > Date.now();
    
    return !!isValid;
}   