import Stripe from "stripe";
import { NextResponse } from "next/server";
import { headers } from "next/headers";

import { db } from "@/lib/db";

import { stripe } from "@/lib/stripe";

export async function POST(req: Request) {
    const body = await req.text();
    const signature = headers().get('Stripe-Signature') as string;

    let event: Stripe.Event;

    try {
        event = stripe.webhooks.constructEvent(
            body,
            signature,
            process.env.STRIPE_WEBHOOK_SECRET!,
        )
    } catch(error) {
        return new NextResponse('Webhook error', {status: 400});
    }


    if(event.type === 'checkout.session.completed') {
        const session = event.data.object as Stripe.Checkout.Session;
        const subscription = await stripe.subscriptions.retrieve(
            session.subscription as string
        );
        console.log("✅ Webhook received! OrgId:", session.metadata?.orgId);

        if(!session?.metadata?.orgId) {
            console.log("❌ metadata.orgId がありません！");
            return new NextResponse('Org Id is required', {status: 400});
        }

        await db.orgSubscription.create({
            data: {
                orgId: session?.metadata?.orgId,
                stripeSubscriptionId: subscription.id,
                stripeCustomerId: subscription.customer as string,
                stripePriceId: subscription.items.data[0].price.id,
                stripeCurrentPeriodEnd: new Date(
                    subscription.current_period_end * 1000
                )
            },
        });
    }

    if(event.type === 'invoice.payment_succeeded') {
        const invoice = event.data.object as Stripe.Invoice; 
        const subscription = await stripe.subscriptions.retrieve(
            // session.subscription as string
            invoice.subscription as string
        );

        await db.orgSubscription.update({
            where: {
                stripeSubscriptionId: subscription.id,
            },
            data: {
                stripePriceId: subscription.items.data[0].price.id,
                stripeCurrentPeriodEnd: new Date(
                    subscription.current_period_end * 1000
                ),
            },
        });
    }

    return new NextResponse(null, {status: 200})
}
